import User from "../../Models/User";

export default interface IUserService {
  getCurrentUserDetails(): Promise<User>;
}
