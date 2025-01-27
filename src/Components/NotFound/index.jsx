import React from 'react';
import NoDataFound from './NoDataFound'; // Assuming this is your existing component for displaying "No Data Found"

export default function NotFound({ text = 'no files found', className = '', style = {} }) {
  return (
    <div className={`d-flex flex-column justify-content-center align-items-center mx-auto ${className}`} style={style}>
      <NoDataFound />
      <p className="h4 mt-4">{text}</p>
    </div>
  );
}
