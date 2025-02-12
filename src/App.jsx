import { useState } from "react";
import "./App.css";
import CSVUploader from "./assets/component/CSVUploader";
import Qrgenerator from "./assets/component/Qrgenerator";
import MyDocument from "./assets/component/MyDocument";


function App() {
  const [data, setData] = useState([]);
  const [csvHeader, setCsvHeader] = useState([]);
  const [label, setLabel] = useState([]);

  const handleFileUpload = (data) => {
    setData(data);
  };
  const labelChange = (label) => {
    setLabel(label);
    console.log(label);
  };

  return (
    <div>
      <CSVUploader onFileUpload={handleFileUpload} />
      <Qrgenerator data={data} label={label} />
     

    </div>
  );
}

export default App;
