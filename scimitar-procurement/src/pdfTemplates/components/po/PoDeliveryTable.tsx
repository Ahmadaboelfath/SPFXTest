import { View, StyleSheet, Text } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  deliveryTableContainer: {
    display: "flex",
    flexDirection: "row",
  },
  Afe: {
    width: "13%",
  },
  shipMethod: {
    width: "13%",
  },
  tableCell: {
    display: "flex",
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
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
  headerCell: {
    backgroundColor: "lightgray",
  },
  deliveryTerms: {
    width: "19%",
  },
  paymentTerms: {
    width: "24%",
  },
  partialShipments: {
    width: "9%",
  },
  pr: {
    width: "6%",
  },
});

export default function PoDeliveryTable() {
  return (
    <View>
      <View style={styles.deliveryTableContainer}>
        <View style={[styles.Afe, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            Requisitioner / AFE #
          </Text>
        </View>
        <View style={[styles.shipMethod, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            SHIP METHOD
          </Text>
        </View>
        <View style={[styles.shipMethod, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            INCOTERMS
          </Text>
        </View>
        <View
          style={[styles.deliveryTerms, styles.tableCell, styles.headerCell]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            DELIVERY TERMS
          </Text>
        </View>
        <View
          style={[styles.paymentTerms, styles.tableCell, styles.headerCell]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            PAYMENT TERMS
          </Text>
        </View>
        <View
          style={[styles.partialShipments, styles.tableCell, styles.headerCell]}
        >
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            PARTIAL SHIPMENTS
          </Text>
        </View>
        <View style={[styles.pr, styles.tableCell, styles.headerCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>PR#</Text>
        </View>
      </View>

      <View style={styles.deliveryTableContainer}>
        <View style={[styles.Afe, styles.tableCell]}>
          <Text style={styles.cellText}>Steam</Text>
        </View>
        <View style={[styles.shipMethod, styles.tableCell]}>
          <Text style={styles.cellText}>By Trucks</Text>
        </View>
        <View style={[styles.shipMethod, styles.tableCell]}>
          <Text style={styles.cellText}>Issran field</Text>
        </View>
        <View style={[styles.deliveryTerms, styles.tableCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            1 - 2 Weeks from placing Po date.
          </Text>
        </View>
        <View style={[styles.paymentTerms, styles.tableCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>
            100 % within two weeks from date of reveving matrials and orginal
            invoice
          </Text>
        </View>
        <View style={[styles.partialShipments, styles.tableCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>Accepted</Text>
        </View>
        <View style={[styles.pr, styles.tableCell]}>
          <Text style={[styles.cellText, styles.cellHeaderText]}>00242</Text>
        </View>
      </View>
    </View>
  );
}
