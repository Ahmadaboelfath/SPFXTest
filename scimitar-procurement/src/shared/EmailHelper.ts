import { SPHttpClientResponse } from "@microsoft/sp-http";
import SPOperations from "./SPOperations";

export default class EmailHelper {
  public static sendEmail(
    templateTitle: string,
    keywordsObject?: any,
    to?: string[]
  ) {
    return SPOperations.getListItems(
      "Email Notification Templates",
      "$filter=Title eq '" + templateTitle + "'"
    ).then((d) => {
      let filter = "";
      if (d && d.value && d.value.length == 1) {
        let template = d.value[0];
        let subject = template.Subject;
        let body = template.Body;
        if (keywordsObject) {
          subject = this.replaceKeywords(subject, keywordsObject);
          keywordsObject.SUBJECT = subject;
          body = this.replaceKeywords(body, keywordsObject);
        }
        let toEmails = to && to.length > 0 ? to : [];
        if (toEmails.length == 0)
          toEmails = template.To.split(";");
        console.log(toEmails);
        for (let index = 0; index < toEmails.length; index++) {
          const element = toEmails[index];
          filter += " Title eq '" + element + "'";
          if (index < toEmails.length - 1)
            filter += " or ";
        }
        return new Promise((resolve) => {
          return resolve(SPOperations.getListItems(
            "Notification Subscribers",
            "$filter=" + filter).then((subscriber) => {
              return new Promise((r2) => {
                let finalEmails = [];
                if (subscriber && subscriber.value && subscriber.value.length > 0) {

                  for (let index = 0; index < subscriber.value.length; index++) {
                    const element = subscriber.value[index];
                    console.log(element.Title);
                    finalEmails.push(element.Title);
                  }
                  console.log("finalEmails", finalEmails);
                  if (finalEmails.length > 0) {
                    let item = {
                      Title: subject,
                      Body: body,
                      To: finalEmails.join(";"),
                      CC: template.Cc,
                    };
                    return r2(SPOperations.addItemToList("Email notification Logs", item));
                  }
                  else {
                    console.log("no usersubscribed for notifications");
                    return r2({ ok: true });
                  }
                }
                console.log("no emails needed");
                return r2({ ok: true });
              });

            }));
        });
      }
    });
  }

  public static sendBatchEmails(
    templateTitles: string[],
    keywordsObject?: any
  ) {
    let filterString = "";
    for (let i = 0; i < templateTitles.length; i++) {
      if (i != 0) filterString += " or ";
      filterString += "Title eq '" + templateTitles[i] + "'";
    }
    return SPOperations.getListItems(
      "Email Notification Templates",
      "$filter=" + filterString
    ).then((d) => {
      let promises = [];
      if (d && d.value && d.value.length > 0) {
        for (let index = 0; index < d.value.length; index++) {
          const template = d.value[index];
          let subject = template.Subject;
          let body = template.Body;
          if (keywordsObject) {
            subject = this.replaceKeywords(subject, keywordsObject);
            keywordsObject.SUBJECT = subject;
            body = this.replaceKeywords(body, keywordsObject);
          }
          console.log(template.Title, template.To);
          let filter = "";
          let To = template.To.split(";");
          if (template.To && To.length > 0) {
            for (let toIindex = 0; toIindex < To.length; toIindex++) {
              const element = To[toIindex];
              filter += " Title eq '" + element + "'";
              if (toIindex < To.length - 1)
                filter += " or ";
            }
          }

          promises.push(new Promise((resolve) => {
            return resolve(SPOperations.getListItems(
              "Notification Subscribers",
              "$filter=" + filter).then((subscriber) => {
                return new Promise((r2) => {
                  let finalEmails = [];
                  if (subscriber && subscriber.value && subscriber.value.length > 0) {

                    for (let subscriberIndex = 0; subscriberIndex < subscriber.value.length; subscriberIndex++) {
                      const element = subscriber.value[subscriberIndex];
                      console.log(element.Title);
                      finalEmails.push(element.Title);
                    }
                    console.log("finalEmails", finalEmails);
                    if (finalEmails.length > 0) {
                      let item = {
                        Title: subject,
                        Body: body,
                        // To: to && to.length > 0 ? to.join(";") : template.To,
                        To: finalEmails.join(";"),
                        CC: template.Cc,
                      };
                      return r2(SPOperations.addItemToList("Email notification Logs", item));
                    } else {
                      console.log("user not subscribed for notifications");
                      return r2({ ok: true });
                    }

                  }
                  console.log("no emails needed");
                  return r2({ ok: true });
                });
              }));
          })
          );
        }
      }
      return new Promise((resolve) => resolve(Promise.all(promises).then((r) => { console.log("promise all result ", r); return { ok: true }; })));
    });
  }

  private static replaceKeywords(content: string, keywordsObject: any) {
    for (var key in keywordsObject)
      content = content.replace(
        new RegExp("{" + key + "}", "g"),
        keywordsObject[key]
      );
    return content;
  }
}
// usage example

// let keywordsObject = {
//     MESSAGEURL: consts.host + window.location.pathname + "#/message/" + this.state.messageId,
// };
// EmailHelper.sendEmail(consts.emailTemplates.PrivacyInvolved, keywordsObject);
// let templates = [];
// templates.push(consts.emailTemplates.PrivacyInvolved);
// templates.push(consts.emailTemplates.SecurityInvolved);
// templates.push(consts.emailTemplates.ServiceEnablementInvolved);
// templates.push(consts.emailTemplates.WorkCouncilInvolved);
// templates.push(consts.emailTemplates.AdoptionMaterialInvolved);
// templates.push(consts.emailTemplates.TargetReleaseInvolved);
// EmailHelper.sendBatchEmails(templates, keywordsObject);
