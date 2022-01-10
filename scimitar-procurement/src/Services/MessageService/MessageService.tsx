import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import IMessageService from "./IMessageService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class MessageService implements IMessageService {
  public async getWelcomeMessageContent(): Promise<string> {
    // const fileContent = await sp.web.getFileByServerRelativeUrl(`${this._currentWebUrl}/Messages/Message/WelcomeMessage.html`).getText();
    // return fileContent;
    const welcomeMessage = await sp.web.lists
      .getByTitle("PagesContent")
      .items.filter(`ContentKey eq 'Welcome'`)
      .get();
    return welcomeMessage[0].ContentText;
  }
}
