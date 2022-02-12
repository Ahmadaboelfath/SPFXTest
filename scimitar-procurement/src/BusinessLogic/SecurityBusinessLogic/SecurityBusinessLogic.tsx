import DependencyManager from "../../DependencyManger/DependencyManger";
import User from "../../Models/ClassModels/User";
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

  async getCurrentUserDetails(): Promise<User> {
    const user = await this._userService.getCurrentUserDetails();
    user.userRole = this.getUserRole(user);
    return user;
  }
  getUserRole(user: User): string {
    const rolesGroups = user.groups.filter(
      (group) => group.groupName !== "Employees"
    );
    if (rolesGroups.length > 0) {
      return rolesGroups[0].groupName;
    } else {
      return "Employees";
    }
  }
}
