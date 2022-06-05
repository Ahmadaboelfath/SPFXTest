import { View, Image, StyleSheet } from "@react-pdf/renderer";
import * as React from "react";

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    display: "flex",
    height: 120,
    flexDirection: "row",
    opacity: 0.5,
  },
});

export default function PoHeader() {
  return (
    <View style={styles.logoContainer}>
      <Image src="../../../assets/images/po-logo.PNG" />
    </View>
  );
}
