import { Checkbox } from "office-ui-fabric-react";
import * as React from "react";
import styles from "./Footer.Module.scss";
import IFooterProps from "./IFooterProps";

export default class Footer extends React.Component<IFooterProps, any> {
  render(): React.ReactNode {
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={`${styles.fifthWidth} ${styles.cell}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td>Budget</td>
                          <td>:</td>
                          <td>
                            <Checkbox
                              label="Yes"
                              checked={
                                this.props.purchaseRequestViewModel
                                  .materialRequisition.budget
                              }
                            />
                          </td>
                          <td>
                            <Checkbox
                              label="No"
                              checked={
                                !this.props.purchaseRequestViewModel
                                  .materialRequisition.budget
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={`${styles.twoFifthWidth} ${styles.cell}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td>Status</td>
                          <td>:</td>
                          <td>
                            <Checkbox
                              label="DIRECT CHARGE"
                              checked={
                                this.props.purchaseRequestViewModel
                                  .materialRequisition.itemStatus ===
                                "Direct Charge"
                              }
                            />
                          </td>
                          <td>
                            <Checkbox
                              label="NON STOCK"
                              checked={
                                this.props.purchaseRequestViewModel
                                  .materialRequisition.itemStatus ===
                                "Non-Stock"
                              }
                            />
                          </td>
                          <td>
                            <Checkbox
                              label="STOCK"
                              checked={
                                this.props.purchaseRequestViewModel
                                  .materialRequisition.itemStatus === "Stock"
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={`${styles.fifthWidth} ${styles.cell}`}>
                    {" "}
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td>Reason For Request:</td>
                          <td></td>
                          <td>
                            {
                              this.props.purchaseRequestViewModel
                                .materialRequisition.useFor
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </tr>
          <tr className={styles.row}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={`${styles.halfWidth} ${styles.cell}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <td>The Delay Delivery Consequences:</td>
                          <td></td>
                          <td>
                            {
                              this.props.purchaseRequestViewModel
                                .materialRequisition.delayConsequences
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={`${styles.halfWidth} ${styles.cell}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <td>Contingency Plan:</td>
                          <td></td>
                          <td>
                            {
                              this.props.purchaseRequestViewModel
                                .materialRequisition.contingencyPlan
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </tr>
          <tr>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={`${styles.cell} ${styles.thirdWidth}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td className={`${styles.cell} ${styles.fullWidth} `}>
                            Warehouse And Invetory Manager
                          </td>
                        </tr>
                        <tr>
                          <table>
                            <tbody>
                              <tr>
                                <td
                                  className={[
                                    styles.cell,
                                    styles.fifthWidth,
                                  ].join(" ")}
                                >
                                  Signature & Date:
                                </td>
                                <td className={[styles.fullWidth].join(" ")}>
                                  <img
                                    src={require("../../../../../../assets/images/Empty.png")}
                                    alt="empty"
                                    className={styles.emptyImage}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={`${styles.cell} ${styles.thirdWidth}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td className={`${styles.cell} ${styles.fullWidth} `}>
                            General Field Manager ( Approval)
                          </td>
                        </tr>
                        <tr>
                          <table>
                            <tbody>
                              <tr>
                                <td
                                  className={[
                                    styles.cell,
                                    styles.fifthWidth,
                                  ].join(" ")}
                                >
                                  Signature & Date:
                                </td>
                                <td className={[styles.fullWidth].join(" ")}>
                                  <img
                                    src={require("../../../../../../assets/images/Empty.png")}
                                    alt="empty"
                                    className={styles.emptyImage}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={`${styles.cell} ${styles.thirdWidth}`}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.row}>
                          <td className={`${styles.cell} ${styles.fullWidth} `}>
                            Prepared By WHs Section Head
                          </td>
                        </tr>
                        <tr>
                          <table>
                            <tbody>
                              <tr>
                                <td
                                  className={[
                                    styles.cell,
                                    styles.fifthWidth,
                                  ].join(" ")}
                                >
                                  Signature & Date:
                                </td>
                                <td className={[styles.fullWidth].join(" ")}>
                                  <img
                                    src={require("../../../../../../assets/images/Empty.png")}
                                    alt="empty"
                                    className={styles.emptyImage}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </tr>
        </tbody>
      </table>
    );
  }
}
