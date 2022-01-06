import SPGroup from "./SPGroup";

export default class User {
  constructor(userGroups?: SPGroup[]) {
    this._groups = userGroups && userGroups.length > 0 ? userGroups : [];
  }

  private _userName: string;
  public get userName(): string {
    return this._userName;
  }
  public set userName(v: string) {
    this._userName = v;
  }

  private _displayName: string;
  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(v: string) {
    this._displayName = v;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }

  private _department: string;
  public get department(): string {
    return this._department;
  }
  public set department(v: string) {
    this._department = v;
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
