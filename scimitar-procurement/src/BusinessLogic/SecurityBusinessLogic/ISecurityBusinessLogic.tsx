import User from "../../Models/ClassModels/User";

export default interface ISecurityBusinessLogic {
  getCurrentUserDetails(): Promise<User>;
}
