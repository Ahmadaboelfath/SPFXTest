export default class MaterialRequesition {
  /**
   *
   */
  constructor(
    id?: number,
    date?: string,
    materialRequesition?: MaterialRequesition
  ) {
    this.requestDate = date ? new Date(date) : new Date();
    this.id = id ? id : 0;
    // this._department = "Admin";
    if (materialRequesition) {
      this._currency = materialRequesition.currency;
      this._department = materialRequesition.department;
      this._id = materialRequesition.id;
      this._priority = materialRequesition.priority;
      this._requestCode = materialRequesition.requestCode;
      this._requestDate = materialRequesition.requestDate;
      this._requestedBy = materialRequesition.requestedBy;
      this._requesterEmail = materialRequesition.requesterEmail;
      this._status = materialRequesition.status;
      this._useFor = materialRequesition.useFor;
      this._requestType = materialRequesition.requestType;
      this._budget = materialRequesition.budget;
      this._contingencyPlan = materialRequesition.contingencyPlan;
      this._delayConsequences = materialRequesition.contingencyPlan;
      this._supplier = materialRequesition.supplier;
      this._itemStatus = materialRequesition.itemStatus;
      this._leadTime = materialRequesition.leadTime;
      this._departmentLookupId = materialRequesition.departmentLookupId;
    }
  }

  private _requestType: string;
  public get requestType(): string {
    return this._requestType;
  }
  public set requestType(v: string) {
    this._requestType = v;
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _requesterEmail: string;
  public get requesterEmail(): string {
    return this._requesterEmail;
  }
  public set requesterEmail(v: string) {
    this._requesterEmail = v;
  }

  private _requestDate: Date;
  public get requestDate(): Date {
    return this._requestDate;
  }
  public set requestDate(v: Date) {
    this._requestDate = v;
  }

  private _department: string;
  public get department(): string {
    return this._department;
  }
  public set department(v: string) {
    this._department = v;
  }

  private _requestedBy: string;
  public get requestedBy(): string {
    return this._requestedBy;
  }
  public set requestedBy(v: string) {
    this._requestedBy = v;
  }

  private _priority: string;
  public get priority(): string {
    return this._priority;
  }
  public set priority(v: string) {
    this._priority = v;
  }

  private _currency: string;
  public get currency(): string {
    return this._currency;
  }
  public set currency(v: string) {
    this._currency = v;
  }

  private _useFor: string;
  public get useFor(): string {
    return this._useFor;
  }
  public set useFor(v: string) {
    this._useFor = v;
  }

  private _requestCode: string;
  public get requestCode(): string {
    return this._requestCode;
  }
  public set requestCode(v: string) {
    this._requestCode = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }

  private _leadTime: Date;
  public get leadTime(): Date {
    return this._leadTime;
  }
  public set leadTime(v: Date) {
    this._leadTime = v;
  }

  private _supplier: string;
  public get supplier(): string {
    return this._supplier;
  }
  public set supplier(v: string) {
    this._supplier = v;
  }

  private _contingencyPlan: string;
  public get contingencyPlan(): string {
    return this._contingencyPlan;
  }
  public set contingencyPlan(v: string) {
    this._contingencyPlan = v;
  }

  private _delayConsequences: string;
  public get delayConsequences(): string {
    return this._delayConsequences;
  }
  public set delayConsequences(v: string) {
    this._delayConsequences = v;
  }

  private _budget: boolean;
  public get budget(): boolean {
    return this._budget;
  }
  public set budget(v: boolean) {
    this._budget = v;
  }

  private _itemStatus: string;
  public get itemStatus(): string {
    return this._itemStatus;
  }
  public set itemStatus(v: string) {
    this._itemStatus = v;
  }

  private _departmentLookupId: string;
  public get departmentLookupId(): string {
    return this._departmentLookupId;
  }
  public set departmentLookupId(v: string) {
    this._departmentLookupId = v;
  }
}
