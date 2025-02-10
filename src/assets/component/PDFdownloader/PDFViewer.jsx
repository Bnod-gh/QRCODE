import React from 'react'

function PDFViewer() {
    const handelView=()=>{
        console.log("Button clicked");
        
    }
  return (
    <div onClick={handelView}>PDFViewer</div>
  )
}

export default PDFViewer