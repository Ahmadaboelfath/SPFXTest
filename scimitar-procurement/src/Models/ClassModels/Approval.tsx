export default class Approval {
  constructor(id?: number) {
    this._id = id ? id : 0;
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }

  private _materialRequesitionId: number;
  public get materialRequesitionId(): number {
    return this._materialRequesitionId;
  }
  public set materialRequesitionId(v: number) {
    this._materialRequesitionId = v;
  }

  private _approver: string;
  public get approver(): string {
    return this._approver;
  }
  public set approver(v: string) {
    this._approver = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }

  private _approvalDate: Date;
  public get approvalDate(): Date {
    return this._approvalDate;
  }
  public set approvalDate(v: Date) {
    this._approvalDate = v;
  }

  private _approvalActionExecutor: string;
  public get approvalActionExecutor(): string {
    return this._approvalActionExecutor;
  }
  public set approvalActionExecutor(v: string) {
    this._approvalActionExecutor = v;
  }
}
