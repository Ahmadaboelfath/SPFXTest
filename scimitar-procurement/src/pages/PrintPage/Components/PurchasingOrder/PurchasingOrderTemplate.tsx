import * as React from "react";
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";
import IPurchasingOrderTemplate from "./IPurchasingOrderTemplateProps";
import styles from "./PurchasingOrderTemplate.module.scss";
export default class PurchasingOrderTemplate extends React.Component<
  IPurchasingOrderTemplate,
  any
> {
  appendPRs(): string {
    let prcodes: string[] = [];
    const materialItems: MaterialRequestionItem[] =
      this.props.purchaseOrderViewModel.purchaseOrderItems;

    materialItems.forEach((item) => {
      const isFound =
        prcodes.filter((prcode) => prcode === item.PRCode).length > 0;
      if (!isFound) {
        prcodes = [...prcodes, item.PRCode];
      }
    });

    return prcodes.join(";");
  }

  render(): React.ReactNode {
    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <tbody>
            {/* Title */}
            <tr>
              <td className={styles.middleText}>
                <p className={styles.title}>Purchase Order</p>
              </td>
            </tr>
            {/* Date and PO */}
            <tr>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td className={styles.emptyCell}>
                      <img
                        src={require("../../../../assets/images/Empty.png")}
                        alt="empty"
                        className={styles.emptyImg}
                      />
                    </td>
                    <td className={styles.backgroundBlueCell}>Date:</td>
                    <td>{new Date().toDateString()}</td>
                  </tr>
                  <tr>
                    <td className={styles.emptyCell}>
                      <img
                        src={require("../../../../assets/images/Empty.png")}
                        alt="empty"
                        className={styles.emptyImg}
                      />
                    </td>
                    <td className={styles.backgroundBlueCell}>P.O.#:</td>
                    <td>
                      {this.props.purchaseOrderViewModel.purchaseOrder.title}
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            {/* Vendor And Ship To */}
            <tr>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.halfWidth,
                      ].join(" ")}
                    >
                      <p
                        className={[
                          styles.textBackroundGrey,
                          styles.tableHeaderText,
                        ].join(" ")}
                      >
                        Vendor Name
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.halfWidth,
                      ].join(" ")}
                    >
                      <p
                        className={[
                          styles.textBackroundGrey,
                          styles.tableHeaderText,
                        ].join(" ")}
                      >
                        Ship To / Bill To
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td>{this.props.vendor.title}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>
                              Address:
                            </td>
                            <td>{this.props.vendor.address}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>
                              Attention:
                            </td>
                            <td>
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .vendorAttention
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Phone:</td>
                            <td>{this.props.vendor.phone}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Fax:</td>
                            <td>{this.props.vendor.fax}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Email:</td>
                            <td>
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .vendorEmail
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td>{this.props.shipTo.title}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>
                              Address:
                            </td>
                            <td>{this.props.shipTo.address}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Phone:</td>
                            <td>{this.props.shipTo.phone}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Fax:</td>
                            <td>{this.props.shipTo.fax}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>
                              Attention:
                            </td>
                            <td>{this.props.shipTo.attention}</td>
                          </tr>
                          <tr>
                            <td className={styles.textBackroundGrey}>Email:</td>
                            <td>{this.props.shipTo.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            {/* Details table */}
            <tr>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>PR#</p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        Requisitioner/ AFE#
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        SHIP METHOD
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        INCOTERMS
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        DELIVERY TERMS
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        PAYMENT TERMS
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        Partial Shipments
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {this.appendPRs()}
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {
                        this.props.purchaseOrderViewModel.purchaseOrder
                          .requesitioner
                      }
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {
                        this.props.purchaseOrderViewModel.purchaseOrder
                          .shipMethodTitle
                      }
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {
                        this.props.purchaseOrderViewModel.purchaseOrder
                          .incoTerms
                      }
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {
                        this.props.purchaseOrderViewModel.purchaseOrder
                          .deliveryTerms
                      }
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {
                        this.props.purchaseOrderViewModel.purchaseOrder
                          .paymentTerms
                      }
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                      ].join(" ")}
                    >
                      {this.props.purchaseOrderViewModel.purchaseOrder
                        .partialShipment
                        ? "Accepted"
                        : "Not Accepted"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            {/* Items  */}
            <tr>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        ITEM NO
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        DESCRIPTION
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>UNIT</p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>QTY</p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>
                        Currency
                      </p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>U/P</p>
                    </th>
                    <th
                      className={[
                        styles.theaderAlignment,
                        styles.cellsWithBorder,
                        styles.textBackroundGrey,
                      ].join(" ")}
                    >
                      <p className={[styles.tableHeaderText].join(" ")}>T/P</p>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderItems()}</tbody>
              </table>
            </tr>
            {/* Grand Total and price */}
            <tr>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td
                      className={[styles.halfWidth, styles.padding].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td>OTHER COMMENTS OR SPICIAL INSTRUCTIONS</td>
                          </tr>
                          <tr
                            className={[
                              styles.cellsWithBorder,
                              styles.cellBackGroundGrey,
                            ].join(" ")}
                          >
                            <td>
                              <ul>
                                <li>
                                  <span className={styles.importantText}>
                                    PENALTY CLAUSE:
                                  </span>
                                  DELAY OF DELIVERY FINE TO BE APPLIED 1 % PER
                                  WEEK/OR PART OF WEEK FROM THE DELAYED
                                  MATERIALS WITH 5 % OF TOTAL PURCHASE ORDER.
                                </li>
                                <li>
                                  ALL PRICES ARE FIRM AND FIXED FOR THE DURATION
                                  OF THE PURCHASE ORDER.
                                </li>
                                <li>SCIMITAR ARE EXEMPTED FROM SALES TAX.</li>
                              </ul>
                            </td>
                          </tr>
                          <tr
                            className={[
                              styles.cellsWithBorder,
                              styles.cellBackGroundGrey,
                            ].join(" ")}
                          >
                            <td>
                              <ul>
                                <li>
                                  <span className={styles.importantText}>
                                    Warranty Clause (if applicable):{" "}
                                  </span>
                                  as per submitted quotation or one year from
                                  date of delivery time, Warranty will apply on
                                  both materials and manufacturing defects and
                                  any required spare parts during the warranty
                                  period.
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr
                            className={[
                              styles.cellsWithBorder,
                              styles.cellBackGroundGrey,
                            ].join(" ")}
                          >
                            <td>
                              <ul>
                                <li>
                                  <span className={styles.importantText}>
                                    Software Update (If applicable):{" "}
                                  </span>
                                  provided with the System will be the latest
                                  commercially distributed version of the
                                  standard Software that is available as of the
                                  date of the Quotation. Vendor committed to
                                  notify
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      className={[styles.halfWidth, styles.padding].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.colorBlue}>TOTAL</td>
                            <td></td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .subTotal
                              }
                            </td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {this.props.purchaseOrderViewModel
                                .purchaseOrderItems.length > 0
                                ? this.props.purchaseOrderViewModel
                                    .purchaseOrderItems[0].currency
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.colorBlue}>DISCOUNT</td>
                            <td>{`${this.props.purchaseOrderViewModel.purchaseOrder.discountPercentage}%`}</td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .discountAmount
                              }
                            </td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {this.props.purchaseOrderViewModel
                                .purchaseOrderItems.length > 0
                                ? this.props.purchaseOrderViewModel
                                    .purchaseOrderItems[0].currency
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.colorBlue}>S & H</td>
                            <td></td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .shipAndHandling
                              }
                            </td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {this.props.purchaseOrderViewModel
                                .purchaseOrderItems.length > 0
                                ? this.props.purchaseOrderViewModel
                                    .purchaseOrderItems[0].currency
                                : ""}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid black" }}>
                            <td className={styles.colorBlue}>Freight Charge</td>
                            <td></td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .freightCharge
                              }
                            </td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {this.props.purchaseOrderViewModel
                                .purchaseOrderItems.length > 0
                                ? this.props.purchaseOrderViewModel
                                    .purchaseOrderItems[0].currency
                                : ""}
                            </td>
                          </tr>
                          <tr style={{ borderTop: "1px solid black" }}>
                            <td className={styles.colorBlue}>GRAND TOTAL</td>
                            <td></td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {
                                this.props.purchaseOrderViewModel.purchaseOrder
                                  .grandTotal
                              }
                            </td>
                            <td
                              className={[styles.backgroundBlueCell].join(" ")}
                            >
                              {this.props.purchaseOrderViewModel
                                .purchaseOrderItems.length > 0
                                ? this.props.purchaseOrderViewModel
                                    .purchaseOrderItems[0].currency
                                : ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            {/* signatures */}
            <tr>
              <table className={styles.table} style={{ marginTop: 50 }}>
                <tbody>
                  <tr>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.thirdWidth,
                      ].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.fontBold}>
                              ----------------------
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>Mohamerd Ali</td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              Procurement Section Head
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.thirdWidth,
                      ].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.fontBold}>
                              ----------------------
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>Soha Mounir</td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>C & P Manager</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      className={[
                        styles.theaderAlignment,
                        styles.thirdWidth,
                      ].join(" ")}
                    >
                      <table className={styles.table} style={{ width: 500 }}>
                        <tbody>
                          <tr>
                            <td className={styles.fontBold}>
                              ----------------------
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>Tamer Ganoub</td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              Procurement and Logistics Manager
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <img
                      src={require("../../../../assets/images/Empty.png")}
                      alt="empty"
                      style={{ maxHeight: "60px" }}
                    />
                  </tr>
                  <tr>
                    <td
                      className={[
                        styles.halfWidth,
                        styles.theaderAlignment,
                      ].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.fontBold}>
                              ----------------------
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>David van Erp</td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              V.P Finance & Commercial
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      className={[
                        styles.halfWidth,
                        styles.theaderAlignment,
                      ].join(" ")}
                    >
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.fontBold}>
                              ----------------------
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>Islam Elnashar</td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              Chief Operations Officer
                            </td>
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
      </div>
    );
  }
  renderItems(): React.ReactNode {
    return this.props.purchaseOrderViewModel.purchaseOrderItems.map(
      (item, index) => {
        return (
          <tr>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {index + 1}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.description}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.unit}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.quantity}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.currency}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.unitPrice}
            </td>
            <td
              className={[styles.theaderAlignment, styles.cellsWithBorder].join(
                " "
              )}
            >
              {item.totalPrice}
            </td>
          </tr>
        );
      }
    );
  }
}
