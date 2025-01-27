import { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { Card, CardContent, CircularProgress, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { showFile, showFolder } from 'helper/api/company/Files';
import { useEffect, useState } from 'react';
import DocViewer from 'react-doc-viewer';
import { useNavigate, useParams } from 'react-router-dom';
function Preview() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { id } = useParams();
  const [data, setData] = useState('');
  console.log('🚀 ~ Preview ~ data:', data);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [docViewerConfig, setDocViewerConfig] = useState([]);
  console.log('🚀 ~ Preview ~ docViewerConfig:', docViewerConfig);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    setScreenHeight(window.innerHeight);
  }, []);
  const getFiles = async () => {
    try {
      const fileData = await showFile(id);
      const contentType = fileData.headers['content-type'];
      const [mainType, subType] = contentType.split('/');
      const url = URL.createObjectURL(fileData?.data);
      setDocViewerConfig([{ uri: url, fileType: subType }]);
      // setData(result);
    } catch (error) {
      // toast.error(error?.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };
  const getFilesData = async () => {
    try {
      const { result } = await showFolder(id);
      setData(result?.data && result?.data);
    } catch (error) {
      // toast.error(error?.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFiles();
    getFilesData();
  }, [refetch, id]);
  const handleBack = () => {
    navigate('/documents');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href =
      'https://filekit-demo.vercel.app/_next/image?url=https%3A%2F%2Fpub-f0aafe24067b4986a388ba29dad82bf4.r2.dev%2Fimage%2F0d976b03-e779-449f-a423-79f9ae26ae9a-Screenshot%20from%202024-06-22%2013-50-56.png&w=1920&q=75';
    link.download = 'Screenshot from 2024-06-22 13-50-56.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Card className="" sx={{ height: '100vh', backgroundColor: '#f9f9f9' }}>
          <CardContent style={{ padding: '0' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '10px', height: '60px', display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{ display: 'flex', gap: '5px', cursor: 'pointer', alignItems: 'center' }}
                onClick={handleBack}
                tabIndex={0}
                onKeyPress={(event) => handleKeyPress(event, handleBack)}
                role="button"
              >
                <ArrowBackRoundedIcon style={{ width: '25px', height: '25px' }} />
                <h6 style={{ margin: '0' }}>Back</h6>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                  onClick={handleDownload}
                  tabIndex={0}
                  onKeyPress={(event) => handleKeyPress(event, handleDownload)}
                  role="button"
                >
                  <FileDownloadRoundedIcon style={{ width: '25px', height: '25px', color: '#cecece' }} />
                  Download
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <ShareRoundedIcon style={{ width: '25px', height: '25px', color: '#cecece' }} />
                  Share
                </div>
              </div>
            </div>
            <Grid container alignItems="center" justifyContent={'space-between'}>
              <Grid item style={{ backgroundColor: 'white', width: '69%' }}>
                {docViewerConfig[0]?.fileType == 'png' ? (
                  <img alt="" style={{ width: '100%', height: '400px', objectFit: 'contain' }} src={docViewerConfig[0]?.uri} />
                ) : (
                  <div>
                    <DocViewer
                      theme={{
                        primary: theme.palette.primary[200],
                        secondary: '#ffffff',
                        tertiary: theme.palette.secondary[200],
                        textPrimary: '#ffffff',
                        textSecondary: theme.palette.primary[200],
                        textTertiary: '#ffffff',
                        disableThemeScrollbar: false
                      }}
                      config={{
                        // header: { overrideComponent: docHeader },
                        pdfVerticalScrollByDefault: true,
                        pdfZoom: {
                          defaultZoom: 0.8,
                          zoomJump: 0.2
                        }
                      }}
                      style={{ width: '100%', height: screenHeight - 56 }}
                      documents={[{ uri: docViewerConfig[0]?.uri, fileType: docViewerConfig[0]?.fileType }]}
                      pluginRenderers={DocViewerRenderers}
                    />
                  </div>
                )}
              </Grid>
              <Grid item style={{ backgroundColor: 'white', height: '100vh', width: '30%' }}>
                <div style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center', borderBottom: '1px solid #eee', padding: '5px 0' }}>
                    <ArticleRoundedIcon style={{ color: '#cecece' }} />
                    <h6 style={{ margin: '0' }}>File Details</h6>
                  </div>
                  <div style={{ margin: '10px 0', padding: '0 15px' }}>
                    <p style={{ fontWeight: 'bolder' }}>{data?.title?.length > 25 ? data?.title.slice(20) : data?.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <p style={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <PlaylistPlayIcon style={{ width: '20px', height: '20px' }} />
                        Type:
                      </p>
                      <p>{data?.type}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <p style={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <PlaylistPlayIcon style={{ width: '20px', height: '20px' }} />
                        updated at:
                      </p>
                      <p>{data?.updated_at}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <p style={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <PlaylistPlayIcon style={{ width: '20px', height: '20px' }} />
                        created at:
                      </p>
                      <p>{data?.created_at}</p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Preview;
