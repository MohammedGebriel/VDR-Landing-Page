import React from 'react';

function PreviewZIPFile() {
  const styles = {
    svg: {
      width: '66.7',

      height: '100%',
      shrink: 0
    },
    pathOpacity: {
      fill: '#FF3E4C',
      opacity: 0.3
    },
    pathFill: {
      fill: '#FF3E4C'
    },
    pathWhite: {
      fill: '#fff'
    }
  };

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" style={styles.svg}>
        <path
          style={styles.pathOpacity}
          d="M69.832 24.624a10.325 10.325 0 0 1-10.31-10.315V0H13.455A13.454 13.454 0 0 0 0 13.454v81.107a13.455 13.455 0 0 0 13.454 13.434h55.303a13.453 13.453 0 0 0 13.455-13.434V24.624h-12.38Z"
        ></path>
        <path
          style={styles.pathFill}
          d="M82.212 24.624h-12.38a10.324 10.324 0 0 1-10.31-10.315V0l22.69 24.624ZM91.966 85.3H29.449a8.03 8.03 0 0 0-8.03 8.03v18.64a8.03 8.03 0 0 0 8.03 8.029h62.517a8.03 8.03 0 0 0 8.03-8.029V93.33a8.03 8.03 0 0 0-8.03-8.03Z"
        ></path>
        <path
          style={styles.pathWhite}
          d="M46.173 106.688v3.635h-3.765v-3.635h3.765Zm5.655.697h6.635v2.935H47.788v-2.765l6.53-9.355h-6.445v-2.915h10.55v2.765l-6.595 9.335Zm12.504-12.1v15.035h-3.62V95.285h3.62Zm6.145 9.76v5.275h-3.635V95.285h5.87c1.785 0 3.15.44 4.085 1.33a4.699 4.699 0 0 1 1.405 3.58 4.923 4.923 0 0 1-.63 2.5 4.382 4.382 0 0 1-1.86 1.725 6.597 6.597 0 0 1-3 .625h-2.235Zm4.04-4.85c0-1.316-.73-1.983-2.19-2h-1.85v3.91h1.85c1.46.017 2.19-.62 2.19-1.91Z"
        ></path>
        <path
          style={styles.pathFill}
          d="M41.099 76.256a6.35 6.35 0 0 1-6.34-6.345v-6.345h12.685v6.345a6.35 6.35 0 0 1-6.345 6.345Zm-3.095-9.445v3.1a3.1 3.1 0 0 0 3.095 3.1 3.105 3.105 0 0 0 3.1-3.1v-3.1h-6.195Z"
        ></path>
        <path style={styles.pathFill} d="M34.753 63.574h6.36v-6.36h-6.36v6.36Z"></path>
        <path style={styles.pathFill} d="M41.098 57.219h6.36v-6.36h-6.36v6.36Z"></path>
        <path style={styles.pathFill} d="M34.753 50.863h6.36v-6.36h-6.36v6.36Z"></path>
        <path style={styles.pathFill} d="M41.098 44.508h6.36v-6.36h-6.36v6.36Z"></path>
      </svg>
    </div>
  );
}

export default PreviewZIPFile;
