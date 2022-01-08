export default class Material {
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _code: string;
  public get code(): string {
    return this._code;
  }
  public set code(v: string) {
    this._code = v;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }

  private _categoryId: number;
  public get categoryId(): number {
    return this._categoryId;
  }
  public set categoryId(v: number) {
    this._categoryId = v;
  }

  private _categoryName: string;
  public get categoryName(): string {
    return this._categoryName;
  }
  public set categoryName(v: string) {
    this._categoryName = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }
}
