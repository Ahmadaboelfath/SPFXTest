import { View, StyleSheet } from "@react-pdf/renderer";
import * as React from "react";
import PoAddressFooter from "../components/po/PoAddressFooter";
import PoDeliveryTable from "../components/po/PoDeliveryTable";
import PoDescriptionTable from "../components/po/PoDescriptionTable";
import PoFooter from "../components/po/PoFooter";
import PoHeader from "../components/po/PoHeader";
import PoInfo from "../components/po/PoInfo";
import PoSignature from "../components/po/PoSignature";

const styles = StyleSheet.create({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function SecondInvoice() {
  return (
    <View style={styles.pageContainer}>
      <PoHeader />
      <PoInfo />
      <PoDeliveryTable />
      <PoDescriptionTable />
      <PoFooter />
      <PoSignature />
      <PoAddressFooter />
    </View>
  );
}
