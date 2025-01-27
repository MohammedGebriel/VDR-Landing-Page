import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { getAudios, getDocuments, getImages, getSpace, getVidoes } from 'helper/api/company/Files';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [space, setSpace] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState(null);
  const [documents, setDocuments] = useState(null);

  const getReportsData = async () => {
    setLoading(true);
    try {
      const spaceData = await getSpace();
      setSpace(spaceData?.result?.data);
      const audioData = await getAudios();
      setAudio(audioData?.result?.data);
      const videoData = await getVidoes();
      setVideo(videoData?.result?.data);
      const imagesData = await getImages();
      setImages(imagesData?.result?.data);
      const documentsData = await getDocuments();
      setDocuments(documentsData?.result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportsData();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard documents={documents} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard audio={audio} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalIncomeDarkCard images={images} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalIncomeLightCard video={video} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
