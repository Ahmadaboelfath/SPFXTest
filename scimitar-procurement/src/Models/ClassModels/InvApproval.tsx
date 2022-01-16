export default class InvApproval {
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

  private _materialRequistionCode: string;
  public get materialRequistionCode(): string {
    return this._materialRequistionCode;
  }
  public set materialRequistionCode(v: string) {
    this._materialRequistionCode = v;
  }

  private _priority: string;
  public get priority(): string {
    return this._priority;
  }
  public set priority(v: string) {
    this._priority = v;
  }

  private _requester: string;
  public get requester(): string {
    return this._requester;
  }
  public set requester(v: string) {
    this._requester = v;
  }

  private _department: string;
  public get department(): string {
    return this._department;
  }
  public set department(v: string) {
    this._department = v;
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
