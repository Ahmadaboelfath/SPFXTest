import User from "../../Models/User";

export default interface ISecurityBusinessLogic {
  getCurrentUserDetails(): Promise<User>;
}
