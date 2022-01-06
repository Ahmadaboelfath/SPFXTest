import User from "../../Models/User";

export default interface IUserMapper {
  mapFromSpUserToUser(SPUser: any): User;
}
