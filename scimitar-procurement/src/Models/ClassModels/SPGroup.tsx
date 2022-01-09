export default class SPGroup {
  constructor(groupName?: string) {
    this._groupName = groupName ? groupName : "";
  }

  private _groupName: string;
  public get groupName(): string {
    return this._groupName;
  }
  public set groupName(v: string) {
    this._groupName = v;
  }
}
