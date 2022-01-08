export default class MaterialRequestionItem {
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
}
