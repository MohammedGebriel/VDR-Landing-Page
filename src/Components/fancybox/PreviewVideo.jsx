/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { CircularProgress, Dialog, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DocViewer from 'react-doc-viewer';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

export default function PreviewVideo({ openDocViewer, handleCloseDocViewer, loading, docViewerConfig, DocViewerRenderers }) {
  console.log('🚀 ~ PreviewVideo ~ docViewerConfig:', docViewerConfig);
  const theme = useTheme();

  const handleClickAway = (event) => {
    // Ensure the click is outside the video element
    if (event.target.tagName.toLowerCase() !== 'video' && event.target.tagName.toLowerCase() !== 'audio') {
      handleCloseDocViewer();
    }
  };

  return (
    <div className="w-full preview">
      <Dialog open={openDocViewer} onClose={handleCloseDocViewer} maxWidth="lg" fullWidth style={{ backgroundColor: '#00000026' }}>
        <Box p={2} position="relative" onClick={handleClickAway} height="94vh">
          <Box position="absolute">
            <IconButton onClick={handleCloseDocViewer} style={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="94vh">
              <CircularProgress style={{ color: 'white' }} />
            </Box>
          ) : (
            <React.Suspense fallback={<CircularProgress />}>
              {docViewerConfig.length > 0 && docViewerConfig[0].fileType === 'image' ? (
                <img src={docViewerConfig[0].uri} alt="Document" style={{ width: '30%' }} />
              ) : docViewerConfig.length > 0 && (docViewerConfig[0].fileType === 'mp4' || docViewerConfig[0].fileType === 'webm') ? (
                <div
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: ' 94vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <video width="50%" height="400" controls>
                    <source src={docViewerConfig[0]?.uri} type={`video/${docViewerConfig[0]?.fileType}`} />
                  </video>
                </div>
              ) : docViewerConfig.length > 0 && docViewerConfig[0].fileType == 'mpeg' ? (
                <div
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: ' 94vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <audio controls>
                    <source src={docViewerConfig[0]?.uri} type={`audio/${docViewerConfig[0]?.fileType}`} />
                  </audio>
                </div>
              ) : (
                <DocViewer
                  theme={{
                    primary: theme.palette.primary[200],
                    secondary: '#ffffff',
                    tertiary: theme.palette.secondary[200],
                    textPrimary: '#ffffff',
                    textSecondary: theme.palette.primary[200],
                    textTertiary: '#00000099',
                    disableThemeScrollbar: false
                  }}
                  documents={docViewerConfig}
                  pluginRenderers={DocViewerRenderers}
                />
              )}
            </React.Suspense>
          )}
        </Box>
      </Dialog>
    </div>
  );
}
