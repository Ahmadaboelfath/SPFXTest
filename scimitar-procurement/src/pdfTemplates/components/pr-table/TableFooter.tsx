import * as React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  FirstFooter: {
    display: "flex",
    flexDirection: "row",
  },
  checkBoxContainerCellSecondFooter: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "90%",
  },
  checkBoxContainerCell: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "80%",
  },
  checkBoxContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  checkBox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderStyle: "solid",
    marginRight: 5,
    position: "relative",
  },
  smallText: {
    fontSize: 8,
  },
  checkMark: {
    width: 8,
    height: 8,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tableDetailsCellContainer: {
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    width: "20%",
    justifyContent: "space-evenly",
    padding: 2,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableUseForCell: {
    width: "50%",
    borderWidth: "1",
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  tableBigUseForCell: {
    width: "80%",
  },
  cellDataContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    // width: '80%',
    paddingLeft: 2,
  },
  smallcellDataContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    // width: '40%',
    paddingLeft: 2,
  },
  smallCellContainer: {
    width: "35%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  smallUsedForCellContainer: {
    width: "100%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  stautsBar: {
    width: "100%",
  },
  fullWidthCell: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  fullWidthDataCell: {
    width: "100%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  usedFor: {
    width: "100%",
  },
  secondFooter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  centeredTextCell: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  thirdFooterDatacenteredTextCellContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    width: "25%",
    justifyContent: "center",
    textAlign: "center",
    height: 40,
  },
  centeredTextCellContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    width: "25%",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
  centerdTextCellContainerPrTable: {
    width: "50%",
  },
  thirdFooterHeader: {
    display: "flex",
    flexDirection: "row",
  },
  thirdFooter: {
    display: "flex",
  },
  sign: {
    width: "20%",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    borderRightWidth: 1,
  },
  signPlace: {
    width: "80%",
  },
  thirdFooterData: {
    display: "flex",
    flexDirection: "row",
  },
});
export default function TableFooter({ prTable }) {
  return (
    <View>
      <View style={styles.FirstFooter}>
        <View style={styles.tableDetailsCellContainer}>
          <Text style={styles.smallText}>Budget</Text>
          <Text style={styles.smallText}>:</Text>
          <View style={styles.checkBoxContainerCell}>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBox}>
                <Image
                  src="../../../assets/images/check-mark-icon.jpg"
                  style={styles.checkMark}
                />
              </View>
              <Text style={styles.smallText}>Yes</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBox} />
              <Text style={styles.smallText}>No</Text>
            </View>
          </View>
        </View>
        <View
          style={[styles.tableUseForCell, prTable && styles.tableBigUseForCell]}
        >
          <Text style={styles.smallText}>Use For</Text>
          <Text style={styles.smallText}>:</Text>
          <View style={styles.cellDataContainer}>
            <Text style={styles.smallText}> 189 test budget</Text>
          </View>
        </View>
        {!prTable && (
          <View style={styles.smallCellContainer}>
            <Text style={styles.smallText}>AFE</Text>
            <Text style={styles.smallText}>:</Text>
            <View style={styles.smallcellDataContainer}>
              {/* <View></View>
                        <View></View>
                        <View></View>
                        <View></View>
                        <View></View>
                        <View></View> */}
            </View>
          </View>
        )}
        <View></View>
      </View>
      <View style={styles.secondFooter}>
        <View style={[styles.tableDetailsCellContainer, styles.stautsBar]}>
          <Text style={styles.smallText}>STATUS</Text>
          <Text style={styles.smallText}>:</Text>
          <View style={styles.checkBoxContainerCellSecondFooter}>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBox} />
              <Text style={styles.smallText}>DIRECT CHARGE</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBox} />
              <Text style={styles.smallText}>NON STOCK</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBox}>
                <Image
                  src="../../../assets/images/check-mark-icon.jpg"
                  style={styles.checkMark}
                />
              </View>
              <Text style={styles.smallText}>STOCK</Text>
            </View>
          </View>
        </View>
        {!prTable && (
          <View style={[styles.fullWidthCell, styles.usedFor]}>
            <View style={styles.smallUsedForCellContainer}>
              <Text style={styles.smallText}>USED FOR</Text>
              <Text style={styles.smallText}>:</Text>
              <View style={styles.cellDataContainer}>
                <Text style={styles.smallText}> 189 test budget</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={styles.thirdFooter}>
        <View style={styles.thirdFooterHeader}>
          <View
            style={[
              styles.centeredTextCellContainer,
              styles.centerdTextCellContainerPrTable,
            ]}
          >
            <Text
              style={[
                styles.centeredTextCell,
                styles.smallText,
                prTable && styles.centerdTextCellContainerPrTable,
              ]}
            >
              Prepared byWHs Section Head
            </Text>
          </View>
          {!prTable && (
            <React.Fragment>
              <View style={styles.centeredTextCellContainer}>
                <Text style={[styles.centeredTextCell, styles.smallText]}>
                  Chief Financial officer (Approval)
                </Text>
              </View>
              <View style={styles.centeredTextCellContainer}>
                <Text style={[styles.centeredTextCell, styles.smallText]}>
                  {" "}
                </Text>
              </View>
            </React.Fragment>
          )}
          <View
            style={[
              styles.centeredTextCellContainer,
              styles.centerdTextCellContainerPrTable,
            ]}
          >
            <Text
              style={[
                styles.centeredTextCell,
                styles.smallText,
                prTable && styles.centerdTextCellContainerPrTable,
              ]}
            >
              Chief Operation Officer (Approval)
            </Text>
          </View>
        </View>
        <View style={styles.thirdFooterData}>
          <View
            style={[
              styles.thirdFooterDatacenteredTextCellContainer,
              prTable && styles.centerdTextCellContainerPrTable,
            ]}
          >
            <View style={styles.sign}>
              <Text style={styles.smallText}>Signature & Date</Text>
            </View>
            <View style={styles.signPlace}></View>
          </View>
          {!prTable && (
            <React.Fragment>
              <View style={styles.thirdFooterDatacenteredTextCellContainer}>
                <View style={styles.sign}>
                  <Text style={styles.smallText}>Signature & Date</Text>
                </View>
                <View style={styles.signPlace}></View>
              </View>
              <View style={styles.thirdFooterDatacenteredTextCellContainer}>
                <View style={styles.sign}>
                  <Text style={styles.smallText}>Signature & Date</Text>
                </View>
                <View style={styles.signPlace}></View>
              </View>
            </React.Fragment>
          )}
          <View
            style={[
              styles.thirdFooterDatacenteredTextCellContainer,
              prTable && styles.centerdTextCellContainerPrTable,
            ]}
          >
            <View style={styles.sign}>
              <Text style={styles.smallText}>Signature & Date</Text>
            </View>
            <View style={styles.signPlace}></View>
          </View>
          {/* <View style={styles.centeredTextCellContainer}></View>
                    <View style={styles.centeredTextCellContainer}></View>
                    <View style={styles.centeredTextCellContainer}></View> */}
        </View>
      </View>
    </View>
  );
}
