import SPGroup from "../../Models/ClassModels/SPGroup";
import User from "../../Models/ClassModels/User";
import IUserMapper from "./IUserMapper";

export default class UserMapper implements IUserMapper {
  mapFromSpUserToUser(SPUserProperties: any[], SPUser: any): User {
    const currentUserGroups = this.mapUserGroups(SPUser.Groups);
    const user: User = new User(currentUserGroups);
    user.userProperties =
      this.mapUserPropertiesArrayToUserPropertiesObject(SPUserProperties);
    user.isAdmin = SPUser.IsSiteAdmin;
    user.userID = SPUser.Id;
    return user;
  }

  mapUserGroups(groups: any[]): SPGroup[] {
    return groups.map((group) => new SPGroup(group.Title));
  }

  mapUserPropertiesArrayToUserPropertiesObject(array: any[]): any {
    const properties = {};
    array.forEach((prop) => {
      properties[prop.Key] = prop.Value;
    });
    return properties;
  }
}
