import DependencyManager from "../../DependencyManger/DependencyManger";
import User from "../../Models/User";
import IUserService from "../../Services/UsersService/IUserService";
import UserService from "../../Services/UsersService/UserService";
import ISecurityBusinessLogic from "./ISecurityBusinessLogic";

export default class SecurityBusinessLogic implements ISecurityBusinessLogic {
  private _userService: IUserService;

  constructor() {
    this._userService = DependencyManager.getInstance().inject(
      UserService.userServiceKey
    );
  }

  getCurrentUserDetails(): Promise<User> {
    return this._userService.getCurrentUserDetails();
  }
}
