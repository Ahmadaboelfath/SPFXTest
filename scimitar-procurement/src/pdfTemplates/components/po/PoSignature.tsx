import { View, StyleSheet, Text } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  signatureContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    textAlign: "center",
  },
  signatureText: {
    fontSize: 12,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  topSignatireRowWidth: {
    minwidth: "40%",
    maxWidth: "40%",
  },
  signatureRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  poSignatureContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  customMargin: {
    marginTop: 40,
  },
});
export default function PoSignature() {
  return (
    <View style={styles.poSignatureContainer}>
      <View style={styles.signatureRow}>
        <View style={[styles.signatureContainer, styles.topSignatireRowWidth]}>
          <Text style={styles.signatureText}>Mohamed Ali</Text>
          <Text style={styles.signatureText}>Senior Buyer</Text>
        </View>
        <View style={[styles.signatureContainer, styles.topSignatireRowWidth]}>
          <Text style={styles.signatureText}>Soha Mounir</Text>
          <Text style={styles.signatureText}>C & P Manger</Text>
        </View>
        <View style={[styles.signatureContainer, styles.topSignatireRowWidth]}>
          <Text style={styles.signatureText}>Tamer Ganoub</Text>
          <Text style={styles.signatureText}>
            Procurement and Logistics Manger
          </Text>
        </View>
      </View>
      <View style={[styles.signatureRow, styles.customMargin]}>
        <View style={[styles.signatureContainer, styles.topSignatireRowWidth]}>
          <Text style={styles.signatureText}>David van Erp</Text>
          <Text style={styles.signatureText}>V.P Finance & Commercial</Text>
        </View>
        <View style={[styles.signatureContainer, styles.topSignatireRowWidth]}>
          <Text style={styles.signatureText}>Islam ElNashar</Text>
          <Text style={styles.signatureText}>Chief Operation Officer</Text>
        </View>
      </View>
    </View>
  );
}
