export default class PurchasingOrder {
  constructor(purchaseOrder?: PurchasingOrder) {
    if (purchaseOrder) {
      this._id = purchaseOrder.id;
      this._title = purchaseOrder.title;
      this._vendorId = purchaseOrder.vendorId;
      this._shipToId = purchaseOrder.shipToId;
      this._requesitioner = purchaseOrder.requesitioner;
      this._shipMethodId = purchaseOrder.shipMethodId;
      this._incoTerms = purchaseOrder.incoTerms;
      this._deliveryTerms = purchaseOrder.deliveryTerms;
      this._paymentTerms = purchaseOrder._paymentTerms;
      this._partialShipment = purchaseOrder.partialShipment;
      this._subTotal = purchaseOrder.subTotal;
      this._discountPercentage = purchaseOrder.discountPercentage;
      this._discountAmount = purchaseOrder.discountAmount;
      this._shipAndHandling = purchaseOrder.shipAndHandling;
      this._freightCharge = purchaseOrder.freightCharge;
      this._grandTotal = purchaseOrder.grandTotal;
      this._vendorAttention = purchaseOrder.vendorAttention;
      this._vendorEmail = purchaseOrder.vendorEmail;
      this._requestorId = purchaseOrder.requestorId;
      this._statusId = purchaseOrder.statusId;
      this._requestorEmail = purchaseOrder.requestorEmail;
      this._vendorTitle = purchaseOrder.vendorTitle;
      this._shipToTitle = purchaseOrder.shipToTitle;
      this._shipMethodTitle = purchaseOrder.shipMethodTitle;
      this._estimatedDelivery = purchaseOrder.estimatedDelivery;
      this._notes = purchaseOrder.notes;
    } else {
      this._subTotal = 0;
      this._discountAmount = 0;
      this._discountPercentage = 0;
      this._freightCharge = 0;
      this._shipAndHandling = 0;
      this._grandTotal = 0;
      this._partialShipment = false;
    }
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _notes: string;
  public get notes(): string {
    return this._notes;
  }
  public set notes(v: string) {
    this._notes = v;
  }

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

  private _statusTitle: string;
  public get statusTitle(): string {
    return this._statusTitle;
  }
  public set statusTitle(v: string) {
    this._statusTitle = v;
  }

  private _shipMethodTitle: string;
  public get shipMethodTitle(): string {
    return this._shipMethodTitle;
  }
  public set shipMethodTitle(v: string) {
    this._shipMethodTitle = v;
  }

  private _shipToId: string;
  public get shipToId(): string {
    return this._shipToId;
  }
  public set shipToId(v: string) {
    this._shipToId = v;
  }

  private _shipToTitle: string;
  public get shipToTitle(): string {
    return this._shipToTitle;
  }
  public set shipToTitle(v: string) {
    this._shipToTitle = v;
  }

  private _vendorTitle: string;
  public get vendorTitle(): string {
    return this._vendorTitle;
  }
  public set vendorTitle(v: string) {
    this._vendorTitle = v;
  }

  private _requesitioner: string;
  public get requesitioner(): string {
    return this._requesitioner;
  }
  public set requesitioner(v: string) {
    this._requesitioner = v;
  }

  private _shipMethodId: number;
  public get shipMethodId(): number {
    return this._shipMethodId;
  }
  public set shipMethodId(v: number) {
    this._shipMethodId = v;
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

  private _statusId: number;
  public get statusId(): number {
    return this._statusId;
  }
  public set statusId(v: number) {
    this._statusId = v;
  }

  private _requestorEmail: string;
  public get requestorEmail(): string {
    return this._requestorEmail;
  }
  public set requestorEmail(v: string) {
    this._requestorEmail = v;
  }

  private _estimatedDelivery: Date;
  public get estimatedDelivery(): Date {
    return this._estimatedDelivery;
  }
  public set estimatedDelivery(v: Date) {
    this._estimatedDelivery = v;
  }
}
