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
import HomePage from "../../../pages/home/HomePage";
import NewPurchaseRequestPage from "../../../pages/new-purchase-request/NewPurchaseRequestPage";
import asyncComponent from "../../../HOC/asyncComponent";
// import MyRequests from "../../../pages/my-requests/MyRequests";

const MyRequests = React.lazy(() => {
  return import("../../../pages/my-requests/MyRequests");
});

export default class ProcurementApp extends React.Component<
  IProcurementAppProps,
  {}
> {
  public render(): React.ReactElement<IProcurementAppProps> {
    return (
      <Router>
        <Switch>
          <Route
            path="/newpurchaserequest"
            render={() => <NewPurchaseRequestPage />}
          />
          <Route
            path="/myrequests"
            render={() => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <MyRequests />
              </React.Suspense>
            )}
          />
          <Route path="/" exact render={() => <HomePage />} />
        </Switch>
      </Router>
    );
  }
}
