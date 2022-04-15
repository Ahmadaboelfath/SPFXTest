import IMaterialTag from "../InterfaceModels/IMaterialTag";
import { IUserLookup } from "./userModels";

export default class MaterialRequestionItem {
  constructor(item?: MaterialRequestionItem) {
    this.quantity = 0;
    this.materialTag = [];
    this.description = "";
    this.materialId = 0;
    this.code = "";
    this.assignee = [];
    this.totalPrice = 0;
    this.unitPrice = 0;
    this.status = "";

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
      this._POCode = item.POCode;
      this._POId = item.POId;
      this._PRCode = item.PRCode;
      this._PRID = item.PRID;
      this._status = item.status;
      this._assignee = item.assignee;
      this._unitPrice = item.unitPrice;
      this._totalPrice = item.totalPrice;
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

  private _assignee: IUserLookup[];
  public get assignee(): IUserLookup[] {
    return this._assignee;
  }
  public set assignee(v: IUserLookup[]) {
    this._assignee = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }

  private _POId: string;
  public get POId(): string {
    return this._POId;
  }
  public set POId(v: string) {
    this._POId = v;
  }

  private _PRID: string;
  public get PRID(): string {
    return this._PRID;
  }
  public set PRID(v: string) {
    this._PRID = v;
  }

  private _POCode: string;
  public get POCode(): string {
    return this._POCode;
  }
  public set POCode(v: string) {
    this._POCode = v;
  }

  private _PRCode: string;
  public get PRCode(): string {
    return this._PRCode;
  }
  public set PRCode(v: string) {
    this._PRCode = v;
  }

  private _unitPrice: number;
  public get unitPrice(): number {
    return this._unitPrice;
  }
  public set unitPrice(v: number) {
    this._unitPrice = v;
  }

  private _totalPrice: number;
  public get totalPrice(): number {
    return this._totalPrice;
  }
  public set totalPrice(v: number) {
    this._totalPrice = v;
  }
}
