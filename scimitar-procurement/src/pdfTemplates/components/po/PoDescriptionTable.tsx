import { View, Text, StyleSheet } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  deliveryTableContainer: {
    display: "flex",
    flexDirection: "row",
  },
  headerCell: {
    backgroundColor: "lightgray",
  },
  cellText: {
    fontSize: 8,
    width: "100%",
    textAlign: "center",
  },
  cellHeaderText: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  tableCell: {
    display: "flex",
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
  },
  numberCell: {
    width: "9%",
  },
  descriptionCell: {
    width: "45%",
  },
  unitCell: {
    width: "9%",
  },
  quantityCell: {
    width: "9%",
  },
  amountCell: {
    width: "25%",
  },
  amountCellUnitCell: {
    width: "50%",
    borderWidth: 1,
    borderColor: "black",
  },
  totallCellTotalCell: {
    width: "50%",
    borderWidth: 1,
    borderColor: "black",
  },
  amountCellHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 1,
  },
  customPadding: {
    padding: 0,
  },
  amountCellDetailsCell: {
    width: "50%",
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  amountCellDetailsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  poDescriptionTableContainer: {
    marginTop: 4,
  },
});
export default function PoDescriptionTable() {
  return (
    <View style={styles.poDescriptionTableContainer}>
      <View style={styles.deliveryTableContainer} fixed>
        <View style={[styles.numberCell, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>ITEM NO</Text>
        </View>
        <View
          style={[styles.descriptionCell, styles.tableCell, styles.headerCell]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            DESCRIPTION
          </Text>
        </View>
        <View style={[styles.unitCell, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>UNIT</Text>
        </View>
        <View
          style={[styles.quantityCell, styles.tableCell, styles.headerCell]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>QYT</Text>
        </View>
        <View
          style={[
            styles.amountCell,
            styles.tableCell,
            styles.headerCell,
            styles.customPadding,
          ]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>QYT</Text>
          <View style={styles.amountCellHeaderContainer}>
            <View style={styles.amountCellUnitCell}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>
                UNIT PRICE
              </Text>
            </View>
            <View style={styles.totallCellTotalCell}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>
                TOTAL
              </Text>
            </View>
          </View>
        </View>
      </View>

      {Array(30)
        .fill(1)
        .map((el, index) => (
          <View style={styles.deliveryTableContainer}>
            <View style={[styles.numberCell, styles.tableCell]}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>
                {index}
              </Text>
            </View>
            <View style={[styles.descriptionCell, styles.tableCell]}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>
                C-2311 Caustic Soda (Pail / 100 kg)
              </Text>
            </View>
            <View style={[styles.unitCell, styles.tableCell]}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>DR</Text>
            </View>
            <View style={[styles.quantityCell, styles.tableCell]}>
              <Text style={[styles.cellText, styles.cellHeaderText]}>40</Text>
            </View>
            <View
              style={[
                styles.amountCell,
                styles.tableCell,
                styles.customPadding,
                styles.amountCellDetailsContainer,
              ]}
            >
              <View style={styles.amountCellDetailsCell}>
                <Text style={[styles.cellText, styles.cellHeaderText]}>
                  210
                </Text>
              </View>
              <View style={styles.amountCellDetailsCell}>
                <Text style={[styles.cellText, styles.cellHeaderText]}>
                  8,400,00
                </Text>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
}
