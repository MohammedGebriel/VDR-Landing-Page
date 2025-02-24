import React from 'react';

function ImageIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        fill="none"
        style={{ width: '40px', height: 'auto', marginBottom: '20px' }}
      >
        <path
          style={{ fill: '#eceff1' }}
          d="M60 14.375v31.25a6.87 6.87 0 0 1-6.875 6.875H6.875a5.868 5.868 0 0 1-1.775-.25A6.842 6.842 0 0 1 0 45.625v-31.25A6.87 6.87 0 0 1 6.875 7.5h46.25A6.87 6.87 0 0 1 60 14.375Z"
        ></path>
        <path fill="#FFC107" d="M17.5 20a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path>
        <path
          fill="#388E3C"
          d="M60 39.85v5.776a6.87 6.87 0 0 1-6.876 6.875H6.874a5.868 5.868 0 0 1-1.774-.25L35.65 21.7c1.7-1.7 4.5-1.7 6.2 0L60 39.85Z"
        ></path>
        <path
          fill="#4CAF50"
          d="M42.65 52.5H6.875a5.868 5.868 0 0 1-1.775-.249A6.842 6.842 0 0 1 0 45.626v-.775l14.4-14.4c1.7-1.7 4.5-1.7 6.2 0L42.65 52.5Z"
        ></path>
      </svg>
    </div>
  );
}

export default ImageIcon;
