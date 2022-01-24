import IMaterialTag from "../InterfaceModels/IMaterialTag";

export default class MaterialRequestionItem {
  constructor(item?: MaterialRequestionItem) {
    this.quantity = 0;
    this.materialTag = [];
    this.description = "";
    this.materialId = 0;
    this.code = "";

    if (item) {
      this._code = item.code;
      this._description = item.description;
      this._id = item.id;
      this._materialId = item.materialId;
      this._materialRequisitionId = item.materialRequisitionId;
      this._order = item.order;
      this._quantity = item.quantity;
      this._unit = item.unit;
      this._materialTag = item.materialTag;
      this._balance = item.balance;
    }
  }
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }

  private _balance: number;
  public get balance(): number {
    return this._balance;
  }
  public set balance(v: number) {
    this._balance = v;
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

  private _materialTag: IMaterialTag[];
  public get materialTag(): IMaterialTag[] {
    return this._materialTag;
  }
  public set materialTag(v: IMaterialTag[]) {
    this._materialTag = v;
  }
}
