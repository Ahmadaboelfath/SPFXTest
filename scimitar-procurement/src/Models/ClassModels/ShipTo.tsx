export default class ShipTo {
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
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

  private _attention: string;
  public get attention(): string {
    return this._attention;
  }
  public set attention(v: string) {
    this._attention = v;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }
}
