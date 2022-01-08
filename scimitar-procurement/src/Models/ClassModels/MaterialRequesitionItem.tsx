export default class MaterialRequestionItem {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }

  private _quantity: number;
  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(v: number) {
    this._quantity = v;
  }

  private _unit: string;
  public get unit(): string {
    return this._unit;
  }
  public set unit(v: string) {
    this._unit = v;
  }

  private _code: string;
  public get code(): string {
    return this._code;
  }
  public set code(v: string) {
    this._code = v;
  }

  private _order: number;
  public get order(): number {
    return this._order;
  }
  public set order(v: number) {
    this._order = v;
  }

  private _materialId: number;
  public get materialId(): number {
    return this._materialId;
  }
  public set materialId(v: number) {
    this._materialId = v;
  }

  private _materialRequisitionId: number;
  public get materialRequisitionId(): number {
    return this._materialRequisitionId;
  }
  public set materialRequisitionId(v: number) {
    this._materialRequisitionId = v;
  }
}
