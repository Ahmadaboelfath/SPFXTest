import { View, Text, StyleSheet } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  PoInfoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  poHeaderContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Header: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 8,
  },
  poHeaderInfoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  poShippingContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  shipingInfoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  SingleValuesContianer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 3,
    flexWrap: "wrap",
  },
  infoText: {
    fontSize: 12,
  },
  infoKeyText: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
});

export default function PoInfo() {
  return (
    <View style={styles.PoInfoContainer}>
      <View style={styles.poHeaderContainer}>
        <Text style={styles.Header}>Purchase Order</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.poHeaderInfoContainer}>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>
              Vendor Name
            </Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>C-Water Treatmen Co.</Text>
          </View>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>Address</Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>
              28 omer ebn elkhattab st., Dokki
            </Text>
          </View>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>Attention</Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>Eng:- Adly A.Hashad</Text>
          </View>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>Phone</Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>33359022</Text>
          </View>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>Fax</Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>33351815</Text>
          </View>
          <View style={styles.SingleValuesContianer}>
            <Text style={[styles.infoText, styles.infoKeyText]}>Email</Text>
            <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
            <Text style={styles.infoText}>Adly@cwater-eg.com</Text>
          </View>
        </View>
        <View style={styles.shipingInfoContainer}>
          <View style={styles.poShippingContainer}>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>Date</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>22-Feb-21</Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>P.O.#</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>EGY-21-086</Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>
                Ship To / Bill To
              </Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>
                General Petroleum Company C/O Scimitar Production Egypt LTD.
                (SPEL)
              </Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>Address</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>
                Block-E, plot # 5, 1st Settlement Service Center, New CAiro
                114477, Cairo, Egypt
              </Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>Phone</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>(202)22470832</Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>Fax</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>(202)22470845</Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>
                Attention
              </Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>
                Procurement & Logistics Manger
              </Text>
            </View>
            <View style={styles.SingleValuesContianer}>
              <Text style={[styles.infoText, styles.infoKeyText]}>Email</Text>
              <Text style={[styles.infoText, styles.infoKeyText]}> : </Text>
              <Text style={styles.infoText}>Tganoub@scimitaregypt.com</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
