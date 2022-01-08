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
import SPGroup from "../../../Models/SPGroup";
import DevWorkBench from "../../../pages/DevWorkbench/DevWorkBench";
import "semantic-ui-css/semantic.min.css";
// import MyRequests from "../../../pages/my-requests/MyRequests";

const MyRequests = React.lazy(() => {
  return import("../../../pages/MyRequests/MyRequests");
});

export default class ProcurementApp extends React.Component<
  IProcurementAppProps,
  {}
> {
  public render(): React.ReactElement<IProcurementAppProps> {
    return (
      <Router>
        <SecurityProvider>
          <Switch>
            <PrivateRoute
              path="/NewMaterialRequestion"
              allowedGroups={[new SPGroup("SitesMaterialAdmin")]}
            >
              <NewMaterialRequestionPage />
            </PrivateRoute>
            {/* <Route
              path="/NewMaterialRequestion"
              render={() => <NewMaterialRequestionPage />}
            /> */}
            <Route
              path="/MyRequests"
              render={() => (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MyRequests />
                </React.Suspense>
              )}
            />
            <Route path="/AccessDenied" render={() => <NotAllowed />} />
            <Route path="/dev" exact render={() => <DevWorkBench />} />
            <Route path="/" exact render={() => <HomePage />} />

            <Route render={() => <ErrorPage />} />
          </Switch>
        </SecurityProvider>
      </Router>
    );
  }
}
