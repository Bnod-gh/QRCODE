import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const MyDocument = ({ data }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track if button is clicked

  // Check if data is valid and not empty
  useEffect(() => {
    // console.log('Data in MyDocument useEffect:', data); // Debugging the data

    // If there's data to process, generate the QR codes
    if (data && data.length > 0) {
      const generateQRCodes = async () => {
        setIsLoading(true); // Set loading state to true before starting QR generation

        // Generate QR codes asynchronously
        const codes = await Promise.all(
          data.map(async (item) => {
            const qrCode = await QRCode.toDataURL(item.suppliercode, { width: 80 });
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
          <View style={{ flexDirection: 'column', flexWrap: 'wrap', width: '210mm', height: '297mm', backgroundColor: '#ffffff', }}>
            <View style={{ paddingTop: '15mm', flexWrap: 'wrap', marginLeft:'5.5mm'}}>
              {data.map((item, index) => (
                <View key={index} style={{ marginLeft: '1mm', marginRight: '1mm', width: '64mm', height: '24.3mm', flexDirection: 'row', borderWidth: '',borderRadius: '', alignItems: 'center', }}>
                  {/* Embed the base64 image for QR code */}
                  <View style={{ width: "40%" }}><Image src={qrCodes[index]} style={{ width: '100%', height: '100%' }} /></View>
                  <View style={{ width: "60%" }}> {/* Displaying gunzsku and product name */}
                    <Text style={{family:'Helvetica', fontSize: 10, fontWeight: 'heavy', textDecoration: 'underline' }}>{item.gunzsku}</Text>
                    <Text style={{ fontSize: 10, flexWrap: 'wrap', }}>{item.productname.slice(0, 65)}</Text></View>
                </View>

              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
