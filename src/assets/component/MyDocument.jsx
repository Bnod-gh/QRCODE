import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const MyDocument = ({ data }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track if button is clicked

  // Check if data is valid and not empty
  useEffect(() => {
    console.log('Data in MyDocument useEffect:', data); // Debugging the data

    // If there's data to process, generate the QR codes
    if (data && data.length > 0) {
      const generateQRCodes = async () => {
        setIsLoading(true); // Set loading state to true before starting QR generation

        // Generate QR codes asynchronously
        const codes = await Promise.all(
          data.map(async (item) => {
            const qrCode = await QRCode.toDataURL(item.suppliercode, { width: 80 });
            console.log("this is my data:", item); // Debugging each item
            return qrCode;
          })
        );
        setQrCodes(codes);  // Store the generated QR codes
        setIsLoading(false); // Set loading state to false once QR codes are generated
      };

      generateQRCodes();  // Call the function to generate QR codes
    }
  }, [data]);

  // Handle case when button is clicked but no data exists
  const handleButtonClick = () => {
    setIsButtonClicked(true); // Set state to show message after the button is clicked
  };

  // If the button is clicked and no data exists, show the no data message
  if (isButtonClicked && (!data || data.length === 0)) {
    return (
      <Document>
        <Page size="A4">
          <Text>No data available to generate QR codes.</Text>
        </Page>
      </Document>
    );
  }

  // Handle loading state, display loading message until QR codes are ready
  if (isLoading) {
    return (
      <Document>
        <Page size="A4">
          <Text>Loading QR codes...</Text>
        </Page>
      </Document>
    );
  }

  // Render the PDF once QR codes are ready
  return (
    
    <Document>
      <Page size="A4">
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fbbf24', width: '100%', height: '100%' }}>
          <View style={{ flexDirection: 'column', marginTop: 2, marginLeft: 2, flexWrap: 'wrap', width: '210mm', height: '297mm', backgroundColor: '#ffffff', padding:1 }}>
            {data.map((item, index) => (
              <View key={index} style={{ width: '70mm', height: '25mm', flexDirection: 'row', borderWidth: 1, borderStyle: 'dashed', alignItems: 'center' }}>
                {/* Embed the base64 image for QR code */}
                <Image src={qrCodes[index]} style={{ width: '12mm', height: '12mm' }} />
                <View style={{ marginLeft: 4 }}>
                  {/* Displaying gunzsku and product name */}
                  <Text style={{ fontSize: 10, fontWeight:'bold' }}>{item.gunzsku}</Text>
                  <Text style={{ fontSize: 10 }}>{item.productname.slice(0, 60)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
