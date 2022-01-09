import User from "../../Models/ClassModels/User";

export default interface IUserMapper {
  mapFromSpUserToUser(SPUserProperties: any[], SPUser: any): User;
}
