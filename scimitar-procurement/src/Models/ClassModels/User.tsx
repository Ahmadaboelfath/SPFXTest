import SPGroup from "./SPGroup";

export default class User {
  constructor(userGroups?: SPGroup[]) {
    this._groups = userGroups && userGroups.length > 0 ? userGroups : [];
  }

  private _userProperties: any;
  public get userProperties(): any {
    return this._userProperties;
  }
  public set userProperties(v: any) {
    this._userProperties = v;
  }

  private _groups: SPGroup[];
  public get groups(): SPGroup[] {
    return this._groups;
  }
  public set groups(v: SPGroup[]) {
    this._groups = v;
  }

  private _isAdmin: boolean;
  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(v: boolean) {
    this._isAdmin = v;
  }

  private _userRole: string;
  public get userRole(): string {
    return this._userRole;
  }
  public set userRole(v: string) {
    this._userRole = v;
  }

  private _userID: number;
  public get userID(): number {
    return this._userID;
  }
  public set userID(v: number) {
    this._userID = v;
  }

  public getGroup(group: SPGroup): SPGroup {
    const filteredGroup = this._groups.filter(
      (crrgroup: SPGroup) => crrgroup.groupName === group.groupName
    );

    if (filteredGroup.length > 0) {
      return filteredGroup[0];
    } else {
      return null;
    }
  }
}
