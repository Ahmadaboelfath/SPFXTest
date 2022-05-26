export default class PurchasingOrder {
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }

  private _vendorId: string;
  public get vendorId(): string {
    return this._vendorId;
  }
  public set vendorId(v: string) {
    this._vendorId = v;
  }

  private _shipToId: string;
  public get shipToId(): string {
    return this._shipToId;
  }
  public set shipToId(v: string) {
    this._shipToId = v;
  }

  private _requesitioner: string;
  public get requesitioner(): string {
    return this._requesitioner;
  }
  public set requesitioner(v: string) {
    this._requesitioner = v;
  }

  private _shipMethod: string;
  public get shipMethod(): string {
    return this._shipMethod;
  }
  public set shipMethod(v: string) {
    this._shipMethod = v;
  }

  private _incoTerms: string;
  public get incoTerms(): string {
    return this._incoTerms;
  }
  public set incoTerms(v: string) {
    this._incoTerms = v;
  }

  private _deliveryTerms: string;
  public get deliveryTerms(): string {
    return this._deliveryTerms;
  }
  public set deliveryTerms(v: string) {
    this._deliveryTerms = v;
  }

  private _paymentTerms: string;
  public get paymentTerms(): string {
    return this._paymentTerms;
  }
  public set paymentTerms(v: string) {
    this._paymentTerms = v;
  }

  private _partialShipment: boolean;
  public get partialShipment(): boolean {
    return this._partialShipment;
  }
  public set partialShipment(v: boolean) {
    this._partialShipment = v;
  }

  private _subTotal: number;
  public get subTotal(): number {
    return this._subTotal;
  }
  public set subTotal(v: number) {
    this._subTotal = v;
  }

  private _discountPercentage: number;
  public get discountPercentage(): number {
    return this._discountPercentage;
  }
  public set discountPercentage(v: number) {
    this._discountPercentage = v;
  }

  private _discountAmount: number;
  public get discountAmount(): number {
    return this._discountAmount;
  }
  public set discountAmount(v: number) {
    this._discountAmount = v;
  }

  private _shipAndHandling: number;
  public get shipAndHandling(): number {
    return this._shipAndHandling;
  }
  public set shipAndHandling(v: number) {
    this._shipAndHandling = v;
  }

  private _freightCharge: number;
  public get freightCharge(): number {
    return this._freightCharge;
  }
  public set freightCharge(v: number) {
    this._freightCharge = v;
  }

  private _grandTotal: number;
  public get grandTotal(): number {
    return this._grandTotal;
  }
  public set grandTotal(v: number) {
    this._grandTotal = v;
  }

  private _vendorAttention: string;
  public get vendorAttention(): string {
    return this._vendorAttention;
  }
  public set vendorAttention(v: string) {
    this._vendorAttention = v;
  }

  private _vendorEmail: string;
  public get vendorEmail(): string {
    return this._vendorEmail;
  }
  public set vendorEmail(v: string) {
    this._vendorEmail = v;
  }

  private _requestorId: number;
  public get requestorId(): number {
    return this._requestorId;
  }
  public set requestorId(v: number) {
    this._requestorId = v;
  }
}