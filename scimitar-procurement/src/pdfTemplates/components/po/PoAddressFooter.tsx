import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  addressContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    padding: 10,
    borderTopColor: "darkyellow",
    marginTop: 30,
  },
  addressContainerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  arabicAddressContainer: {
    minWidth: "50%",
    maxWidth: "50%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  englishAddressContainer: {
    minWidth: "50%",
    maxWidth: "50%",
  },
  addressText: {
    fontSize: 9,
  },
  arabicArddress: {
    height: 50,
    width: "80%",
  },
});

export default function PoAddressFooter() {
  return (
    <View style={styles.addressContainer}>
      <View style={styles.addressContainerBox}>
        <View style={styles.englishAddressContainer}>
          <Text style={styles.addressText}>
            Block-E, Plot # 5, 1st Settlement Service Center
          </Text>
          <Text style={styles.addressText}>
            New Cairo 114477, Cairo , Egypt
          </Text>
          <Text style={styles.addressText}>Tel: (202) 2247-0832</Text>
          <Text style={styles.addressText}>Fax: (202) 2247-0835</Text>
          <Text style={styles.addressText}>
            WebSite: http://www.testscimitaregypt.com
          </Text>
        </View>
        <View style={styles.arabicAddressContainer}>
          <Image
            src="../../../assets/images/footerArabicAddress.PNG"
            style={styles.arabicArddress}
          />
        </View>
      </View>
    </View>
  );
}
