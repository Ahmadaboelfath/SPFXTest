import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions,HttpClientResponse } from "@microsoft/sp-http";
import { IPrincipal, ISPEnsureUserResponse, ISPUserSearchJSON, IUserSuggestion, ISPUserSearchResponse } from "../Models/ClassModels/userModels";

const LOG_SOURCE = "[SPOperation]";
export default class SPOperations {
  private static CTX: any;
  public static getListItems(
    listName: any,
    selectFilterQuery?: any,
    siteUrl?: any
  ) {
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    selectFilterQuery = selectFilterQuery || "";
    return this.CTX.spHttpClient
      .get(
        `${siteUrl}/_api/lists/GetByTitle('${listName}')/items?${selectFilterQuery}`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => responseJSON);
      });
  }
  public static addItemToList(
    listName: any,
    item: any,
    siteUrl?: any
  ) {
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    const spOpts: ISPHttpClientOptions = {
      body: JSON.stringify(item)
    };
    return this.CTX.spHttpClient
      .post(
        `${siteUrl}/_api/lists/GetByTitle('${listName}')/items`,
        SPHttpClient.configurations.v1,
        spOpts
      );
  }
  public static removeItemFromList(listName: any,
    itemId: any,
    siteUrl?: any){
      siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
      const spOpts: ISPHttpClientOptions = {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'DELETE'
        }
      };
      return this.CTX.spHttpClient
        .post(
          `${siteUrl}/_api/lists/GetByTitle('${listName}')/items(${itemId})`,
          SPHttpClient.configurations.v1,
          spOpts
        )
        .then((response: SPHttpClientResponse) =>  response );
  }
  public static updateListItem(
    listName: any,
    item: any,
    itemId: any,
    siteUrl?: any
  ) {
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    const spOpts: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': '',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE'
      },
      body: JSON.stringify(item)
    };
    return this.CTX.spHttpClient
      .post(
        `${siteUrl}/_api/lists/GetByTitle('${listName}')/items(${itemId})`,
        SPHttpClient.configurations.v1,
        spOpts
      )
      .then((response: SPHttpClientResponse) =>  response );
  }
  public static getValidURL(alias: string) {
    return this.CTX.spHttpClient
      .get(
        `https://vodafone.sharepoint.com/_api/GroupSiteManager/GetValidSiteUrlFromAlias?alias='${alias}'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => responseJSON);
      });
  }
  public static getUserProfile(userEmail: string, siteUrl? :string){
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    return this.CTX.spHttpClient
      .get(
        `${siteUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|${userEmail}'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => responseJSON);
      });
  }
  public static getUserGroups(userId, siteUrl? :string){
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    return this.CTX.spHttpClient
      .get(
        `${siteUrl}/_api/Web/GetUserById(${userId})/Groups'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => responseJSON.value);
      });
  }
  public static isInternalUser(userEmail: string, siteUrl? :string){
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    return this.CTX.spHttpClient
      .get(
        `${siteUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|${userEmail}'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => 
        responseJSON.UserProfileProperties.filter(u => u.Key == "VF-INTERNALUSER")[0].Value == "True");
      });
  }
  public static getUserId(email: string, siteUrl? :string) {
    siteUrl = siteUrl || this.CTX.pageContext.web.absoluteUrl;
    const spOpts: ISPHttpClientOptions = {
      body: JSON.stringify({
        'logonName':email
      })
    };
    return this.CTX.spHttpClient
      .post(
        `${siteUrl}/_api/web/ensureuser`,
        SPHttpClient.configurations.v1,
        spOpts
      )
      .then((response: SPHttpClientResponse) => {
        return response.json().then((responseJSON: any) => responseJSON.Id);
      });
    // return web.ensureUser(email).then(result => {
    //   return result.data.Id;
    // });
  }
  public static ensureUsers(logins: string[]): Promise<IPrincipal[]> {
    console.info(LOG_SOURCE, `Ensuring users: logins=${logins.join(", ")}.`);

    const promises = logins.map((k) => {
      return this.CTX.spHttpClient
        .post(
          `${this.CTX.pageContext.web.absoluteUrl}/_api/web/ensureUser`,
          SPHttpClient.configurations.v1,
          { body: JSON.stringify({ logonName: k }) }
        )
        .then((response) =>
          this.handleResponse<ISPEnsureUserResponse>(response)
        )
        .catch(() => undefined) // silently die
        .then((json) => {
          if (json) {
            console.log(json);
            var email = json.Email || "";
            try{
              email = json.LoginName.split('|')[2];
            }
            catch{
              email = json.Email;
            }
            return {
              name: json.LoginName,
              displayName: json.Title || "",
              email: email || "",
              isUser: json.PrincipalType === 1, // user principal
              id: json.Id || -1,
              imageUrl:  `${this.CTX.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?accountname=${json.Email}&size=M`
            } as IPrincipal;
          }
        });
    });
    return Promise.all(promises).then(
      (users) => users.filter((u) => !!u) as IPrincipal[]
    );
  }
  private static getLoginOrId(u: ISPUserSearchJSON): string {
    if (u.EntityData && u.EntityData.PrincipalType === 'SharePointGroup') {
        return u.EntityData.SPGroupID || '';
    }
    return u.Key || '';
}

  public static findPeople(query: string, limit: number, peopleOnly: boolean): Promise<IUserSuggestion[]> {
    console.info(LOG_SOURCE, `Searching people: query=${query}.`);

    return this.CTX.spHttpClient
        .post(
            `${this.CTX.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`,
            SPHttpClient.configurations.v1,
            {
                body: JSON.stringify({
                    'queryParams': {
                        'AllowEmailAddresses': true,
                        'AllowMultipleEntities': false,
                        'AllUrlZones': false,
                        'MaximumEntitySuggestions': limit,
                        'PrincipalSource': 15,
                        'PrincipalType': peopleOnly ? 1 : 7, // everything but SP groups
                        'QueryString': query
                    }
                })
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json() as ISPUserSearchResponse;
            }
            throw new Error(response.statusText || (response as any).statusMessage || response.status);
        })
        .then((json: ISPUserSearchResponse) => {
            if (json && json.value) {
              console.log(JSON.parse(json.value));
                const users = JSON.parse(json.value) as ISPUserSearchJSON[];
                return (users || []).map(u => ({
                    id: this.getLoginOrId(u),
                    displayName: u.DisplayText || '',
                    email: u.EntityData && u.EntityData.Email || '',
                    imageUrl: `${this.CTX.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?accountname=${u.EntityData.Email}&size=M`,
                    isUser: u.EntityType === 'User' || u.EntityData && u.EntityData.PrincipalType === 'User',
                    isADGroup: u.EntityType === 'FormsRole' && u.EntityData && u.EntityData.PrincipalType !== 'SharePointGroup',
                    isUnvalidatedEmail: u.EntityData && u.EntityData.PrincipalType === 'UNVALIDATED_EMAIL_ADDRESS' && u.EntityData.SPUserID,
                } ));
            }
            return [];
        })
        .then(users => users.filter(u => !!u));
}
  private static handleResponse<T = any>(
    response: SPHttpClientResponse | HttpClientResponse,
    noJson: boolean = false
  ): Promise<T> {
    if (response.ok) {
      return noJson ? Promise.resolve(undefined) : response.json();
    }
    return response
      .json()
      .then((json) => {
        const error = json["error"] || json["odata.error"];
        if (error && error.message) {
          return (
            (typeof error.message === "object"
              ? error.message.value
              : error.message) || ""
          );
        }
      })
      .catch((e) => e)
      .then((e) => {
        const error = new Error(
          e ||
            response.statusText ||
            (response as any).statusMessage ||
            response.status
        );
        console.warn("[BaseService]", `Response error: ${error}.`); // just a warning, error is logged or handled down the pipeline
        if (response.status == 403) {
          const error403 = new Error("not allowed");
          throw error403;
        } else {
          throw error;
        }
      });
  }
  public static initalizeContext(context: any) {
    this.CTX = context;
  }
  public static getContext() {
    return this.CTX;
  }
  public static getCurrentUser() {
    return this.CTX.pageContext.user;
  }
}
