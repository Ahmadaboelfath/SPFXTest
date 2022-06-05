import { DropdownItemProps } from "semantic-ui-react";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";

import ILookupService from "./ILookupService";
import DropDownItem from "./DropDownItem";

export default class LookupService implements ILookupService {
  //   public static readonly lookupsServiceKey: ServiceKey<ILookupService> =
  //     ServiceKey.create<ILookupService>("ABTTool:LookupdService", LookupService);
  //   private _spHttpClient: SPHttpClient;
  //   private _pageContext: PageContext;
  //   private _currentWebUrl: string;

  //   constructor(serviceScope?: ServiceScope) {
  //     serviceScope.whenFinished(() => {
  //       this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
  //       this._pageContext = serviceScope.consume(PageContext.serviceKey);
  //       this._currentWebUrl = this._pageContext.web.absoluteUrl;
  //     });
  //   }

  public async getOptionsForSemanticDropDown(
    listNames: string[]
  ): Promise<any> {
    return await Promise.all(
      listNames.map(async (listName) => {
        const items = await sp.web.lists.getByTitle(listName).items.getAll();
        const sortedData = items.sort((a, b) => a.Id - b.Id);
        const mappedItems: DropDownItem[] = sortedData.map((item) => {
          return {
            text: item.Title,
            value: item.Id,
            internalName: item.InternalName,
            group: item.Group ? item.Group : "",
          };
        });
        return {
          listName: listName,
          lookups: mappedItems,
        };
      })
    );
  }
}
