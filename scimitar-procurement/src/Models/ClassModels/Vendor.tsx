export default class Vendor {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }

  private _address: string;
  public get address(): string {
    return this._address;
  }
  public set address(v: string) {
    this._address = v;
  }

  private _phone: string;
  public get phone(): string {
    return this._phone;
  }
  public set phone(v: string) {
    this._phone = v;
  }

  private _fax: string;
  public get fax(): string {
    return this._fax;
  }
  public set fax(v: string) {
    this._fax = v;
  }
}
