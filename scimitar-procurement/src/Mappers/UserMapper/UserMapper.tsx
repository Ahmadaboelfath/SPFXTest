import SPGroup from "../../Models/SPGroup";
import User from "../../Models/User";
import IUserMapper from "./IUserMapper";

export default class UserMapper implements IUserMapper {
  mapFromSpUserToUser(SPUser: any): User {
    const groups = this.mapUserGroups(SPUser.Groups);
    const user: User = new User(groups);
    user.displayName = SPUser.Title;
    user.email = SPUser.Email;
    user.isAdmin = SPUser.IsSiteAdmin;
    return user;
  }

  mapUserGroups(groups: any[]): SPGroup[] {
    return groups.map((group) => new SPGroup(group.Title));
  }
}
