import React, { useState,useEffect } from "react";
import Papa from "papaparse";
import DownloadPdfButton from "./DownloadPdfButton";


function CSVUploader({onFileUpload}) {
  const [fileupload, setFileupload] = useState(null);
  
  
  const handelChange =(e) => {
    const csvfile = e.target.files[0];
    setFileupload(csvfile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileupload) {
      Papa.parse(fileupload, {
        complete: (result) => {
          onFileUpload(result.data);
          setFileupload(null)
        },
        header:true,
      });
    }

    
  };

  
  return (
    <div className="min-h-20 text-center  bg-amber-200 flex gap-2 justify-center items-center">
      <div className="w-4/5"><label htmlFor="myfile">Select a file: </label>
      <input
        type="file"
        name="myfile"
        id="myfile"
        className="bg-slate-700 p-2 text-white cursor-pointer"
        accept=".csv"
        onChange={handelChange}
      />
     < button type="button" className="focus:outline-none target-_blank text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleSubmit}>Submit</button></div>
      
     
     
    </div>
  );
}

export default CSVUploader;
