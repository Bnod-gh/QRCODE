import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument  from './MyDocument'; // Make sure this is correctly imported

const DownloadPdfButton = ({ data }) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName="qrcodes.pdf">
      {({ loading }) =>
        loading ? (
          <div className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer">Loading...</div>
        ) : (
          <div className="px-4 py-2 bg-green-500 rounded-md cursor-pointer">Download PDF</div>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadPdfButton;
