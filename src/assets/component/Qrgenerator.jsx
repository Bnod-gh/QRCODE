import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import DownloadPdfButton from './DownloadPdfButton'; // Import the button component

function Qrgenerator({ data }) {
  const itemsPerPage = 33; // Limit of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Exclude the last row from the data
  const excludinglastrow = data.slice(0, data.length - 1);

  // Split data into pages
  const pages = [];
  for (let i = 0; i < excludinglastrow.length; i += itemsPerPage) {
    pages.push(excludinglastrow.slice(i, i + itemsPerPage));
  }

  // Get the data for the current page
  const currentPageData = pages[currentPage - 1] || [];

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 w-auto h-full">
      <div className="flex flex-col mt-2 ml-2 flex-wrap w-[210mm] h-[297mm] bg-white">
        {currentPageData.length > 0 ? (
          currentPageData.map((row, index) => (
            <div key={index} className="w-[70mm] h-[25mm] flex border-[1px] border-dashed items-center">
              <div className="w-[40%] flex items-center justify-center">
                <QRCodeCanvas value={row.suppliercode} size={80} />
              </div>
              <div className="w-3/5 flex flex-col text-[14px]">
                <p className="font-bold h-1/3 overflow-hidden underline">{row.gunzsku}</p>
                <p className="h-2/3 overflow-hidden">{row.productname.slice(0, 60)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center pt-8 text-6xl uppercase">No Data Available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between w-full mt-4 px-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-md">
          Previous
        </button>
        <span className="self-center text-xl">Page {currentPage} of {pages.length}</span>
        <button onClick={nextPage} disabled={currentPage === pages.length} className="px-4 py-2 bg-gray-300 rounded-md">
          Next
        </button>
      </div>

      {/* Download PDF Button */}
      <DownloadPdfButton data={currentPageData} />
    </div>
  );
}

export default Qrgenerator;
