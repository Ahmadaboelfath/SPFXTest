import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    width: "100%",
  },
  instructions: {
    minWidth: "50%",
    height: 200,
  },
  checkOutContainer: {
    width: "50%",
    padding: 15,
  },
  checkoutCaluclationCellText: {
    minWidth: "20%",
    fontSize: 9,
  },
  checkoutTitle: {
    color: "darkblue",
  },
  calculationRow: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  calculationValueText: {
    backgroundColor: "lightblue",
  },
  lastCheckoutValue: {
    minWidth: "10%",
    fontSize: 9,
  },
  discound: {
    color: "red",
  },
  line: {
    maxWidth: "90%",
    minHeight: 5,
    backgroundColor: "black",
    marginLeft: 8,
  },
});
export default function PoFooter() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.instructions}>
        <Image src="../../../assets/images/footer.PNG" />
      </View>
      <View style={styles.checkOutContainer}>
        <View style={styles.calculationRow}>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.checkoutTitle]}
          >
            SUBTOTAL
          </Text>
          <Text style={styles.checkoutCaluclationCellText}></Text>
          <Text style={styles.checkoutCaluclationCellText}></Text>
          <Text
            style={[
              styles.checkoutCaluclationCellText,
              styles.calculationValueText,
            ]}
          >
            8,400,00
          </Text>
          <Text style={[styles.lastCheckoutValue, styles.calculationValueText]}>
            USD
          </Text>
        </View>
        <View style={styles.calculationRow}>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.checkoutTitle]}
          >
            DISCOUND
          </Text>
          <Text style={[styles.checkoutCaluclationCellText, styles.discound]}>
            5%
          </Text>
          <Text style={styles.checkoutCaluclationCellText}></Text>
          <Text
            style={[
              styles.checkoutCaluclationCellText,
              styles.calculationValueText,
            ]}
          >
            420
          </Text>
          <Text style={[styles.lastCheckoutValue, styles.calculationValueText]}>
            USD
          </Text>
        </View>
        <View style={styles.calculationRow}>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.checkoutTitle]}
          >
            S & H
          </Text>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.discound]}
          ></Text>
          <Text style={styles.checkoutCaluclationCellText}></Text>
          <Text
            style={[
              styles.checkoutCaluclationCellText,
              styles.calculationValueText,
            ]}
          ></Text>
          <Text style={[styles.lastCheckoutValue, styles.calculationValueText]}>
            USD
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.calculationRow}>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.checkoutTitle]}
          >
            GRAND TOTAL
          </Text>
          <Text
            style={[styles.checkoutCaluclationCellText, styles.discound]}
          ></Text>
          <Text style={styles.checkoutCaluclationCellText}></Text>
          <Text
            style={[
              styles.checkoutCaluclationCellText,
              styles.calculationValueText,
            ]}
          >
            7,980,00
          </Text>
          <Text style={[styles.lastCheckoutValue, styles.calculationValueText]}>
            USD
          </Text>
        </View>
      </View>
    </View>
  );
}
