export default class MaterialRequesition {
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
}
