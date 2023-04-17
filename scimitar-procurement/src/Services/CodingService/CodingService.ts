import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import ICodingService from "./ICodingService";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class CodingService implements ICodingService {
  public static readonly serviceKey: ServiceKey<ICodingService> =
    ServiceKey.create<ICodingService>(
      "Procurement:CodingService",
      CodingService
    );
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;
  private _configListUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
      this._configListUrl = `${this._pageContext.web.serverRelativeUrl}/Lists/CodingConfiguration`;
    });
  }

  async codeMR(): Promise<string> {
    const codeNumber = await this.getLatestMRCode();
    await sp.web
      .getList(this._configListUrl)
      .items.getById(codeNumber.codeItemId)
      .update({ Code: codeNumber.newCode });

    return codeNumber.codeNumber;
  }

  async codePO(): Promise<string> {
    const codeNumber = await this.getLatestPOCode();
    await sp.web
      .getList(this._configListUrl)
      .items.getById(codeNumber.codeItemId)
      .update({ Code: codeNumber.newCode });

    return codeNumber.codeNumber;
  }

  private async getLatestMRCode(): Promise<{
    codeItemId: number;
    codeNumber: string;
    newCode: number;
  }> {
    const codeItem = await sp.web
      .getList(this._configListUrl)
      .items.filter(`Title eq 'MaterialRequisition'`)
      .get();

    const codeNumber: number = codeItem[0].Code;
    const newCode = codeNumber + 1;
    return {
      codeItemId: codeItem[0].ID,
      codeNumber: this.generateMRCode(newCode),
      newCode: newCode,
    };
  }
  private generateMRCode(codeNumber: number): any {
    const year = new Date().getFullYear();
    return `${codeNumber}/${year}`;
  }
  private async getLatestPOCode(): Promise<{
    codeItemId: number;
    codeNumber: string;
    newCode: number;
  }> {
    const codeItem = await sp.web
      .getList(this._configListUrl)
      .items.filter(`Title eq 'PurchasingOrder'`)
      .get();

    const codeNumber: number = codeItem[0].Code;
    const newCode = codeNumber + 1;
    return {
      codeItemId: codeItem[0].ID,
      codeNumber: this.generatePOCode(newCode),
      newCode: newCode,
    };
  }
  private generatePOCode(codeNumber: number): any {
    const year = new Date().getFullYear() - 2000;
    return `${year}-${codeNumber}`;
  }
}
