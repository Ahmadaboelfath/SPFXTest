export default class PurchasingRequest {
  constructor(id?: number, purchasingRequest?: PurchasingRequest) {
    this._id = id ? id : null;
    if (purchasingRequest) {
      this._id = purchasingRequest.id;
      this._assignedTo = purchasingRequest.assignedTo;
      this._fieldManagerApproval = purchasingRequest.fieldManagerApproval;
      this._materialRequesitionId = purchasingRequest.materialRequesitionId;
      this._requestCode = purchasingRequest.requestCode;
      this._assignedToId = purchasingRequest.assignedToId;
      this._rejectionReason = purchasingRequest.rejectionReason;
      this._creationDate = purchasingRequest.creationDate;
    }
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }

  private _requestCode: string;
  public get requestCode(): string {
    return this._requestCode;
  }
  public set requestCode(v: string) {
    this._requestCode = v;
  }

  private _materialRequesitionId: string;
  public get materialRequesitionId(): string {
    return this._materialRequesitionId;
  }
  public set materialRequesitionId(v: string) {
    this._materialRequesitionId = v;
  }

  private _assignedTo: string;
  public get assignedTo(): string {
    return this._assignedTo;
  }
  public set assignedTo(v: string) {
    this._assignedTo = v;
  }

  private _assignedToId: string;
  public get assignedToId(): string {
    return this._assignedToId;
  }
  public set assignedToId(v: string) {
    this._assignedToId = v;
  }

  private _fieldManagerApproval: string;
  public get fieldManagerApproval(): string {
    return this._fieldManagerApproval;
  }
  public set fieldManagerApproval(v: string) {
    this._fieldManagerApproval = v;
  }

  private _rejectionReason: string;
  public get rejectionReason(): string {
    return this._rejectionReason;
  }
  public set rejectionReason(v: string) {
    this._rejectionReason = v;
  }

  private _creationDate: Date;
  public get creationDate(): Date {
    return this._creationDate;
  }
  public set creationDate(v: Date) {
    this._creationDate = v;
  }
}
