import User from "../../Models/ClassModels/User";

export default interface IUserService {
  getCurrentUserDetails(): Promise<User>;
}
