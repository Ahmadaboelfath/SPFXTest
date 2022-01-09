import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import User from "../../Models/ClassModels/User";
import IUserService from "./IUserService";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import IUserMapper from "../../Mappers/UserMapper/IUserMapper";
import UserMapper from "../../Mappers/UserMapper/UserMapper";
import { sp } from "@pnp/sp";
import "@pnp/sp/profiles";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

export default class UserService implements IUserService {
  public static readonly userServiceKey: ServiceKey<IUserService> =
    ServiceKey.create<IUserService>("ScimitarProc:userService", UserService);
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;
  private _mapper: IUserMapper;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
    this._mapper = new UserMapper();
  }
  async getCurrentUserDetails(): Promise<User> {
    const requestUrl = `${this._currentWebUrl}/_api/web/currentuser?$expand=groups,FirstName&$select=*,Groups/Title`;
    try {
      const response = await this._spHttpClient.get(
        requestUrl,
        SPHttpClient.configurations.v1
      );

      if (response.status === 200) {
        const jsonResponse = await response.json();
        const profile = await sp.profiles.myProperties.get();
        console.log(profile);
        return this._mapper.mapFromSpUserToUser(
          profile.UserProfileProperties,
          jsonResponse
        );
      } else {
        throw new Error("failed to retrieve the current user data");
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        "unexpected error occurred while retrieving current user data"
      );
    }
  }
}
