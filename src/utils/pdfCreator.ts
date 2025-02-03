import { ApiResponse } from "../interfaces/common";
import jsPDF from "jspdf";

export const handleGeneratePDF = (responseData: ApiResponse | null) => {
    if (!responseData) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Search Result", 10, 10);

    // Vehicles Section
    if (responseData.vehicles) {
      doc.setFontSize(14);
      doc.text("Vehicles", 10, 20);
      const { datos_tecnicos } = responseData.vehicles;

      let yPosition = 30;
      for (const [key, value] of Object.entries(datos_tecnicos || {})) {
        doc.setFontSize(12);
        const formattedKey = key.replace("_", " ");
        doc.text(`${formattedKey}: ${value}`, 10, yPosition);
        yPosition += 10;
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      }
    }

    // Person Section
    if (responseData.person) {
      doc.setFontSize(14);
      doc.text("Person", 10, 30);
      const personData = responseData.person;

      let yPosition = 40;
      for (const [key, value] of Object.entries(personData)) {
        doc.setFontSize(12);
        const formattedKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
        doc.text(`${formattedKey}: ${value}`, 10, yPosition);
        yPosition += 10;
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      }
    }

    // Open PDF in New Tab
    window.open(doc.output("bloburl"), "_blank");
  };