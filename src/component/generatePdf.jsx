import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DownloadReportButton = ({ user, predictions }) => {
    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add title and user information
        doc.setFontSize(18);
        doc.text("Health Report", 14, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${user.firstName} ${user.lastName}`, 14, 30);
        doc.text(`Email: ${user.email}`, 14, 40);

        // Prepare predictions data for the table
        const tableData = predictions.map((prediction) => [
            prediction.disease,
            `${(prediction.probability * 100).toFixed(2)}%`,
            prediction.description,
            prediction.precautions.join(", "),
            new Date(prediction.date).toLocaleDateString(),
        ]);

        // Add the table
        doc.autoTable({
            head: [["Disease", "Probability", "Description", "Precautions", "Date"]],
            body: tableData,
            startY: 50,
        });

        // Save the PDF
        doc.save(`Health_Report_${user.firstName}_${user.lastName}.pdf`);
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Download Health Report
        </button>
    );
};

export default DownloadReportButton;
