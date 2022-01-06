import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import * as React from "react";
import ISecurityBusinessLogic from "../../BusinessLogic/SecurityBusinessLogic/ISecurityBusinessLogic";
import SecurityBusinessLogic from "../../BusinessLogic/SecurityBusinessLogic/SecurityBusinessLogic";
import User from "../../Models/User";
import SecurityProviderState from "./SecurityProviderState";

const SecurityContext = React.createContext(new User());

class SecurityProvider extends React.Component<any, SecurityProviderState> {
  private _securityBusinessLogic: ISecurityBusinessLogic;

  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
    };
    this._securityBusinessLogic = new SecurityBusinessLogic();
  }

  componentDidMount(): void {
    this._securityBusinessLogic.getCurrentUserDetails().then((user) => {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.user = user;
        return newState;
      });
    });
  }

  private renderLoader(): JSX.Element {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <Spinner label="Loading" size={SpinnerSize.large} />;
      </div>
    );

    // <LoadingBoxComponent childLoader={true} />;
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.user.email ? (
          <SecurityContext.Provider value={this.state.user}>
            {this.props.children}
          </SecurityContext.Provider>
        ) : (
          this.renderLoader()
        )}
      </>
    );
  }
}

const SecurityConsumer = SecurityContext.Consumer;
export { SecurityProvider, SecurityConsumer, SecurityContext };
