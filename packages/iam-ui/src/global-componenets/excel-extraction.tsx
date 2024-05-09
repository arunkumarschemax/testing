import { Button } from 'antd';
import React from 'react';
import ExcelJS from 'exceljs';

const ExcelExtraction = () => {
    const workbook = new ExcelJS.Workbook();

    const k = async () => {
        const sheet = workbook.addWorksheet('kkkk');
        // Add some sample data to the worksheet
        sheet.addRow(['Sample', 'Data', 'For', 'Excel']);
        workbook.addWorksheet('t', { properties: { tabColor: { argb: 'FFC0000' } } });
        workbook.addWorksheet('y', { views: [{ showGridLines: false }] });
        workbook.addWorksheet('z', {
            headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
        });

        workbook.addWorksheet('j', {
            pageSetup: { paperSize: 9, orientation: 'landscape' }
        });



        // Convert the workbook to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example.xlsx'); // Set the filename for download

        // Simulate click on the link to trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup: remove the link and revoke the URL object
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    const getExcel = () => {
        // console.log(u,"iiiiiiiiiiiii")
    }

    return (
        <>
            <Button onClick={k}>Download Excel</Button>
            <Button onClick={getExcel}>GET Excel</Button>
        </>
    );
};

export default ExcelExtraction;
