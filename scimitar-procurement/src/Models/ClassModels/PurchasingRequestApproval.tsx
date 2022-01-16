export default class PurchasingRequestApproval {
  constructor(
    id?: number,
    purchasingRequestApproval?: PurchasingRequestApproval
  ) {
    this._id = id ? id : null;
    if (purchasingRequestApproval) {
      this._id = purchasingRequestApproval.id;
      this._approver = purchasingRequestApproval.approver;
      this._purchasingRequestId = purchasingRequestApproval.purchasingRequestId;
      this._status = purchasingRequestApproval.status;
      this._executioner = purchasingRequestApproval.executioner;
      this._approvalDate = purchasingRequestApproval.approvalDate;
    }
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }

  private _approver: string;
  public get approver(): string {
    return this._approver;
  }
  public set approver(v: string) {
    this._approver = v;
  }

  private _purchasingRequestId: number;
  public get purchasingRequestId(): number {
    return this._purchasingRequestId;
  }
  public set purchasingRequestId(v: number) {
    this._purchasingRequestId = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }

  private _executioner: string;
  public get executioner(): string {
    return this._executioner;
  }
  public set executioner(v: string) {
    this._executioner = v;
  }

  private _approvalDate: Date;
  public get approvalDate(): Date {
    return this._approvalDate;
  }
  public set approvalDate(v: Date) {
    this._approvalDate = v;
  }

  private _requestCode: string;
  public get requestCode(): string {
    return this._requestCode;
  }
  public set requestCode(v: string) {
    this._requestCode = v;
  }
}
