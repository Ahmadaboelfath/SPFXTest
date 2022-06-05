import * as React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
  },
  bodyHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  bodyData: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  bodyHeaderCell: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 2,
    textAlign: "center",
    justifyContent: "center",
  },
  bodyDataCell: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 2,
    textAlign: "center",
    borderBottomStyle: "dashed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  DescriptionCell: {
    minWidth: "50%",
    maxWidth: "50%",
  },
  smallDescription: {
    minWidth: "40%",
    maxWidth: "40%",
  },
  bodyHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  oneCellColumn: {
    minWidth: "5%",
    maxWidth: "5%",
    textAlign: "center",
  },
  smallOnceCellCoulmn: {
    minWidth: "20%",
    maxWidth: "20%",
    textAlign: "center",
  },
  twoCellColumn: {
    minWidth: "30%",
    maxWidth: "30%",
    textAlign: "center",
    padding: 0,
  },
  smalltwoCellColumn: {
    minWidth: "25%",
    maxWidth: "25%",
    textAlign: "center",
    padding: 0,
  },
  halfCellColumn: {
    minWidth: "12.5%",
    maxWidth: "12.5%",
  },
  whiteCell: {
    borderLeftWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  blackCell: {
    borderLeftWidth: 1,
    borderLeft: 1,
    backgroundColor: "grey",
    borderStyle: "solid",
    borderColor: "black",
  },
  centerText: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
});
export default function TableBody({ prTable }) {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyHeader} fixed>
        <View style={[styles.bodyHeaderCell, styles.oneCellColumn]}>
          <Text style={styles.bodyHeaderText}>#</Text>
        </View>
        <View style={[styles.bodyHeaderCell, styles.oneCellColumn]}>
          <Text style={styles.bodyHeaderText}>QTY</Text>
        </View>
        <View style={[styles.bodyHeaderCell, styles.oneCellColumn]}>
          <Text style={styles.bodyHeaderText}>UNIT</Text>
        </View>
        <View
          style={[
            styles.bodyHeaderCell,
            prTable ? styles.smallDescription : styles.DescriptionCell,
          ]}
        >
          <Text style={styles.bodyHeaderText}>Description</Text>
        </View>
        <View
          style={[
            styles.bodyHeaderCell,
            prTable ? styles.smalltwoCellColumn : styles.twoCellColumn,
          ]}
        >
          <Text style={styles.bodyHeaderText}>M.E.C. (Item Code)</Text>
        </View>
        <View
          style={[
            styles.bodyHeaderCell,
            prTable ? styles.smallOnceCellCoulmn : styles.oneCellColumn,
          ]}
        >
          <Text style={styles.bodyHeaderText}>
            {prTable ? "proposed supplier" : "StockH"}
          </Text>
        </View>
      </View>
      {Array(30)
        .fill(1)
        .map((el, index) => (
          <View style={styles.bodyData}>
            <View style={[styles.bodyDataCell, styles.oneCellColumn]}>
              <Text style={[styles.bodyHeaderText, styles.centerText]}>
                {index}
              </Text>
            </View>
            <View style={[styles.bodyDataCell, styles.oneCellColumn]}>
              <Text style={[styles.bodyHeaderText, styles.centerText]}>1</Text>
            </View>
            <View style={[styles.bodyDataCell, styles.oneCellColumn]}>
              <Text style={[styles.bodyHeaderText, styles.centerText]}>EA</Text>
            </View>
            <View
              style={[
                styles.bodyDataCell,
                prTable ? styles.smallDescription : styles.DescriptionCell,
              ]}
            >
              <Text style={styles.bodyHeaderText}>
                AIR CONDITION CARRIER 2025 HP OPTIMAX HOT - COLD (FIRE ROOM )
              </Text>
            </View>
            <View
              style={[
                styles.bodyDataCell,
                prTable ? styles.smalltwoCellColumn : styles.twoCellColumn,
              ]}
            >
              <View style={[styles.halfCellColumn, styles.whiteCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.blackCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.whiteCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.blackCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.whiteCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.blackCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.whiteCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
              <View style={[styles.halfCellColumn, styles.blackCell]}>
                <Text style={[styles.bodyHeaderText, styles.centerText]}>
                  1
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.bodyDataCell,
                prTable ? styles.smallOnceCellCoulmn : styles.oneCellColumn,
              ]}
            >
              <Text style={[styles.bodyHeaderText, styles.centerText]}>
                Stock
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}
