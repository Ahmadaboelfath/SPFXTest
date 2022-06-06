import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import InvoicesContainer from "../../../pdfTemplates/containers/Invoice";
import * as React from "react";

const generatePdfDocument = async (fileName) => {
  const blob = await pdf(<InvoicesContainer />).toBlob();
  saveAs(blob, fileName);
};

export default generatePdfDocument;
