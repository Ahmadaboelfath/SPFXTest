import * as React from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/HeaderSection";
import ItemsTable from "./Components/ItemsTable/ItemsTable";
import IPurchasingRequestTemplateProps from "./IPurchasingRequestTemplateProps";
import styles from "./PurchasingRequestTemplate.module.scss";

export default class PurchasingRequestTemplate extends React.Component<
  IPurchasingRequestTemplateProps,
  any
> {
  render(): React.ReactNode {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.header}>
            <Header
              PRNumber={
                this.props.purchasignRequestViewModel.purchaseRequest
                  .requestCode
              }
              purchaseRequestViewModel={this.props.purchasignRequestViewModel}
            />
          </div>
          <div className={styles.body}>
            <ItemsTable
              items={
                this.props.purchasignRequestViewModel.materialRequeisitionItems
              }
              supplier={
                this.props.purchasignRequestViewModel.materialRequisition
                  .supplier
              }
              isSr={
                this.props.purchasignRequestViewModel.materialRequisition
                  .requestType === "SR"
              }
            />
          </div>
          <div className={styles.footer}>
            <Footer
              purchaseRequestViewModel={this.props.purchasignRequestViewModel}
            />
          </div>
        </div>
      </>
    );
  }
}
