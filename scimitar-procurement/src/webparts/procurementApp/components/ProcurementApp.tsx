import * as React from "react";
import styles from "./ProcurementApp.module.scss";
import { IProcurementAppProps } from "./IProcurementAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  BrowserRouter,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import HomePage from "../../../pages/Home/HomePage";
import NewMaterialRequestionPage from "../../../pages/NewMaterialRequestion/NewMaterialRequestion";
import asyncComponent from "../../../HOC/asyncComponent";
import ErrorPage from "../../../pages/Error/Error";
import { SecurityProvider } from "../../../Context/SecurityContext/SecurityProvider";
import NotAllowed from "../../../pages/NotAllowed/NotAllowed";
import PrivateRoute from "../../../CoreComponents/PrivateRoute/PrivateRoute";
import SPGroup from "../../../Models/ClassModels/SPGroup";
import DevWorkBench from "../../../pages/DevWorkbench/DevWorkBench";
import "semantic-ui-css/semantic.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../../CoreComponents/ComponentStyles.scss";
import MaterialRequistionInvApproval from "../../../pages/MaterialRequistionInvApproval/MaterialRequistionInvApproval";
import IProcurementAppState from "./IProcurementAppState";
import "./custom.scss";
import { LoadingBoxComponent } from "../../../CoreComponents/LodingBox";
import { HeaderPageComponent } from "../../../CoreComponents/Header";
import { FooterPageComponent } from "../../../CoreComponents/Footer";
import NewServiceRequestion from "../../../pages/NewServiceRequisiton/NewServiceRequestion";
import PRAssigning from "../../../pages/PRAssigning/PRAssigning";
import PurchasingRequestApprovalPage from "../../../pages/PurchaseRequestApproval/PurchasingRequestApproval";

// import MyRequests from "../../../pages/my-requests/MyRequests";

const MyRequests = React.lazy(() => {
  return import("../../../pages/MyRequests/MyRequests");
});

const InvApprovals = React.lazy(() => {
  return import("../../../pages/InvApprovals/InvApprovals");
});

const PRPendingApprovals = React.lazy(() => {
  return import("../../../pages/PRPendingApproval/PRPendingApprovals");
});

const ApprovedPR = React.lazy(() => {
  return import("../../../pages/PRPendingAssigning/PRPendingAssigning");
});

export default class ProcurementApp extends React.Component<
  IProcurementAppProps,
  IProcurementAppState
> {
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    const PageDiv = document.querySelector(".ms-SPLegacyFabricBlock");
    const PageDivHeight = (PageDiv as HTMLElement).offsetParent;
    this.setState({ fullheight: (PageDivHeight as HTMLElement).offsetHeight });
  }
  public render(): React.ReactElement<IProcurementAppProps> {
    return (
      <div className={styles.app} id="appMaster">
        <div className="wrapper">
          <Router>
            <SecurityProvider>
              <HeaderPageComponent />
              <div style={{ minHeight: this.state.fullheight - 50 }}>
                <Switch>
                  <PrivateRoute
                    path="/NewMaterialRequesition"
                    allowedGroups={[new SPGroup("Employees")]}
                  >
                    <NewMaterialRequestionPage />
                  </PrivateRoute>
                  <PrivateRoute
                    path="/NewServiceRequesition"
                    allowedGroups={[new SPGroup("Employees")]}
                  >
                    <NewServiceRequestion />
                  </PrivateRoute>
                  <PrivateRoute
                    path="/MaterialRequestInvApproval/:id"
                    allowedGroups={[new SPGroup("Inventory")]}
                  >
                    <MaterialRequistionInvApproval />
                  </PrivateRoute>
                  <PrivateRoute
                    path="/PRApproval/:id"
                    allowedGroups={[new SPGroup("FieldManager")]}
                  >
                    <PurchasingRequestApprovalPage />
                  </PrivateRoute>
                  <PrivateRoute
                    path="/PRAssigning/:id"
                    allowedGroups={[new SPGroup("Procurement")]}
                  >
                    <PRAssigning />
                  </PrivateRoute>
                  {/* <Route
              path="/NewMaterialRequestion"
              render={() => <NewMaterialRequestionPage />}
            /> */}
                  <Route
                    path="/MyRequests"
                    render={() => (
                      <React.Suspense fallback={<LoadingBoxComponent />}>
                        <MyRequests />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="/InvApproval"
                    render={() => (
                      <React.Suspense fallback={<LoadingBoxComponent />}>
                        <InvApprovals />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="/PRPendingApprovals"
                    render={() => (
                      <React.Suspense fallback={<LoadingBoxComponent />}>
                        <PRPendingApprovals />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="/ApprovedPR"
                    render={() => (
                      <React.Suspense fallback={<LoadingBoxComponent />}>
                        <ApprovedPR />
                      </React.Suspense>
                    )}
                  />
                  <Route path="/AccessDenied" render={() => <NotAllowed />} />
                  <Route path="/dev" render={() => <DevWorkBench />} />
                  <Route path="/" exact render={() => <HomePage />} />

                  <Route render={() => <ErrorPage />} />
                </Switch>
              </div>
              <FooterPageComponent />
            </SecurityProvider>
          </Router>
        </div>
      </div>
    );
  }
}
