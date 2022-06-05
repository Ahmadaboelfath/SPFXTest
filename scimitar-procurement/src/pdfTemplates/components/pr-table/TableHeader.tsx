import * as React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  tableHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    height: 90,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  tableHeaderDetails: {
    flexGrow: 1,
    minWidth: "30%",
    maxWidth: "30%",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeaderDetailsCell: {
    fontSize: 12,
  },
  tableHeaderLogo: {
    minWidth: "30%",
    maxWidth: "30%",
    borderColor: "black",
    borderStyle: "solid",
    flexGrow: 1,
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 2,
  },
  tableHeaderExtraDetails: {
    minWidth: "40%",
    maxWidth: "40%",
    borderColor: "black",
    flexGrow: 1,
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeaderDetailsCellContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
    paddingTop: 2,
    paddingBottom: 2,
  },
  tableHeaderDetailsRowTitle: {
    minWidth: "35%",
    paddingLeft: 2,
  },
  tableHeaderDetailsRowData: {},
  tableHeaderDetailsRowDataContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  tableCheckboxHeaderDetailsRowDataContainer: {
    display: "flex",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  noBottomBoder: {
    borderBottomWidth: 0,
  },
  emptyCellContainer: {
    height: 20,
    borderBottomWidth: 1,
    borderStyle: "solid",
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
  checkBoxContainerCell: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "100%",
  },
  checkBoxText: {
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
  logoContainer: {
    width: 230,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "",
  },
});
export default function TableHeader({ logoTitle, prTable }) {
  return (
    <View style={styles.tableHeaderContainer} fixed>
      <View style={styles.tableHeaderDetails}>
        <View style={styles.tableHeaderDetailsCellContainer}>
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            Date
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableHeaderDetailsRowDataContainer}>
            <Text
              style={[styles.tableHeaderDetailsRowData, styles.tableHeaderText]}
            >
              05/01/2021
            </Text>
          </View>
        </View>

        <View style={styles.tableHeaderDetailsCellContainer}>
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            PR.No
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableHeaderDetailsRowDataContainer}>
            <Text
              style={[styles.tableHeaderDetailsRowData, styles.tableHeaderText]}
            >
              00004/2021
            </Text>
          </View>
        </View>

        <View style={styles.tableHeaderDetailsCellContainer}>
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            Requested by
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableHeaderDetailsRowDataContainer}>
            <Text
              style={[styles.tableHeaderDetailsRowData, styles.tableHeaderText]}
            >
              Mohamed Saber
            </Text>
          </View>
        </View>

        <View
          style={[styles.tableHeaderDetailsCellContainer, styles.noBottomBoder]}
        >
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            Department
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableHeaderDetailsRowDataContainer}>
            <Text
              style={[styles.tableHeaderDetailsRowData, styles.tableHeaderText]}
            >
              Field Administration
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tableHeaderLogo}>
        <View style={styles.logoContainer}>
          <Image src="../../../assets/images/logo.png" style={styles.logo} />
        </View>
        <Text style={styles.logoText}>Scimitar Production Egypt Ltd</Text>
        <Text style={styles.logoText}>{logoTitle}</Text>
      </View>

      <View style={styles.tableHeaderExtraDetails}>
        {!prTable && <View style={styles.emptyCellContainer} />}
        <View style={styles.tableHeaderDetailsCellContainer}>
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            Perority
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableCheckboxHeaderDetailsRowDataContainer}>
            <View style={styles.checkBoxContainerCell}>
              <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox}>
                  <Image
                    src="../../../assets/images/check-mark-icon.jpg"
                    style={styles.checkMark}
                  />
                </View>
                <Text style={styles.checkBoxText}>Standard</Text>
              </View>
              <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox} />
                <Text style={styles.checkBoxText}>Urgent</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tableHeaderDetailsCellContainer}>
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            Est. Cost.
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableHeaderDetailsRowDataContainer}>
            <Text
              style={[styles.tableHeaderDetailsRowData, styles.tableHeaderText]}
            ></Text>
          </View>
        </View>

        <View
          style={[
            styles.tableHeaderDetailsCellContainer,
            !prTable && styles.noBottomBoder,
          ]}
        >
          <Text
            style={[styles.tableHeaderDetailsRowTitle, styles.tableHeaderText]}
          >
            CUR
          </Text>
          <Text style={styles.tableHeaderText}>:</Text>
          <View style={styles.tableCheckboxHeaderDetailsRowDataContainer}>
            <View style={styles.checkBoxContainerCell}>
              <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox}>
                  <Image
                    src="../../../assets/images/check-mark-icon.jpg"
                    style={styles.checkMark}
                  />
                </View>
                <Text style={styles.checkBoxText}>JSD</Text>
              </View>
              <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox} />
                <Text style={styles.checkBoxText}>EGP</Text>
              </View>
              <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox} />
                <Text style={styles.checkBoxText}>EURO</Text>
              </View>
            </View>
          </View>
        </View>

        {prTable && (
          <View
            style={[
              styles.tableHeaderDetailsCellContainer,
              styles.noBottomBoder,
            ]}
          >
            <Text
              style={[
                styles.tableHeaderDetailsRowTitle,
                styles.tableHeaderText,
              ]}
            >
              AFE#
            </Text>
            <Text style={styles.tableHeaderText}>:</Text>
            <View style={styles.tableHeaderDetailsRowDataContainer}>
              <Text
                style={[
                  styles.tableHeaderDetailsRowData,
                  styles.tableHeaderText,
                ]}
              ></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
