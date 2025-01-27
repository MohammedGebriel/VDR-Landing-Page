import React, { useCallback, useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box, Card, CardContent, Checkbox, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showFile } from 'helper/api/company/Files';
import PropTypes from 'prop-types';
import docxImg from '../../assets/images/filesImgs/docx.png';
import fileImg from '../../assets/images/filesImgs/file.png';
import folderImg from '../../assets/images/filesImgs/folder.png';
import imageImg from '../../assets/images/filesImgs/image.png';
import jsonImg from '../../assets/images/filesImgs/json.png';
import musicImg from '../../assets/images/filesImgs/music.png';
import pdfImg from '../../assets/images/filesImgs/pdf.png';
import txtImg from '../../assets/images/filesImgs/txt.png';
import FolderActions from './FolderActions';
import PreviewVideoIcon from 'Components/icons/PreivewVideoIcon';
import PreviewExcelIcon from 'Components/icons/PreviewExcelIcon';
import PreviewZIPFile from 'Components/icons/PreviewZIPFile';
import PreviewVideo from 'Components/fancybox/PreviewVideo';
import { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const ItemTypes = {
  FILE: 'file',
};

const fileTypeToImg = {
  folder: folderImg,
  file: fileImg,
  documents: pdfImg,
  docx: docxImg,
  audios: musicImg,
  images: imageImg,
  json: jsonImg,
  txt: txtImg,
};

const MainFileCard = ({
  file,
  favourite,
  onClickFavourite,
  isDisableFavourite,
  removeFavourite,
  onClickRemoveFavourite,
  isDisableRemoveFavourite,
  rename,
  onClickRename,
  isDisableRename,
  trash,
  onClickTrash,
  isDisableTrash,
  selectedIDS,
  handleCheckboxChange,
  deleteTrash = false,
  onClickDeleteTrash,
  isDisableDeleteTrash = false,
  restoreTrash = false,
  onClickRestoreTrash,
  isDisableRestoreTrash = false,
  refetch,
  setRefetch,
  share,
  download,
  move,
  sort,
  index,
  moveCard,
  isOver,
}) => {
  const navigate = useNavigate();
  const [openDocViewer, setOpenDocViewer] = useState(false);
  const [docViewerConfig, setDocViewerConfig] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.FILE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FILE,
    item: { type: ItemTypes.FILE, id: file.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const fileImgSrc =
    file.file_type === 'file'
      ? folderImg
      : file.file_type === 'pdf'
      ? pdfImg
      : fileTypeToImg[file?.file_type] || fileImg;

  const isSelected = selectedIDS.includes(file.id);

  const onClick = useCallback(async () => {
    if (file?.type === 'folder') {
      navigate(`/folder/${file?.id}`);
    } else if (file?.file_type === 'images') {
      navigate(`/preview/${file?.id}`);
    } else if (file?.file_type === 'videos' || file?.file_type === 'audios') {
      setLoading(true);
      setOpenDocViewer(true);

      try {
        const fileData = await showFile(file?.id);
        const contentType = fileData.headers['content-type'];
        const [mainType, subType] = contentType.split('/');
        const url = URL.createObjectURL(fileData?.data);
        setDocViewerConfig([{ uri: url, fileType: subType }]);
      } catch (error) {
        toast.error('File Not Found');
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/preview/${file?.id}`);
    }
  }, [file, navigate]);

  const handleCloseDocViewer = () => {
    setOpenDocViewer(false);
    setDocViewerConfig([]);
  };

  return (
    <>
      <Card
        ref={ref}
        className="mainFileCard"
        sx={{
          mb: 2,
          height: '165px',
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isOver ? 'rgba(0, 255, 0, 0.2)' : 'inherit',
        }}
      >
        <CardContent>
          <Grid container alignItems="start" justifyContent="space-between">
            <Grid item>
              <Checkbox checked={isSelected} onChange={() => handleCheckboxChange(file.id)} />
            </Grid>
            <Grid sx={{ cursor: 'pointer' }} onClick={onClick} item>
              {file.file_type === 'videos' ? (
                <PreviewVideoIcon />
              ) : file.file_type === 'xlsx' ? (
                <PreviewExcelIcon />
              ) : file.file_type === 'zip' ? (
                <PreviewZIPFile />
              ) : (
                <img height={80} src={fileImgSrc} alt={file?.type} />
              )}
            </Grid>
            <Grid item>
              <FolderActions
                file={file}
                favourite={favourite}
                onClickFavourite={onClickFavourite}
                isDisableFavourite={isDisableFavourite}
                rename={rename}
                onClickRename={onClickRename}
                isDisableRename={isDisableRename}
                trash={trash}
                onClickTrash={onClickTrash}
                isDisableTrash={isDisableTrash}
                removeFavourite={removeFavourite}
                onClickRemoveFavourite={onClickRemoveFavourite}
                isDisableRemoveFavourite={isDisableRemoveFavourite}
                deleteTrash={deleteTrash}
                onClickDeleteTrash={onClickDeleteTrash}
                isDisableDeleteTrash={isDisableDeleteTrash}
                restoreTrash={restoreTrash}
                onClickRestoreTrash={onClickRestoreTrash}
                isDisableRestoreTrash={isDisableRestoreTrash}
                refetch={refetch}
                setRefetch={setRefetch}
                share={share}
                download={download}
                sort={sort}
                move={move}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', alignSelf: 'flex-end', mt: 2 }}>
            <Typography variant="h6" noWrap>
              {file?.title || 'Untitled'}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <PreviewVideo
        docViewerConfig={docViewerConfig}
        handleCloseDocViewer={handleCloseDocViewer}
        openDocViewer={openDocViewer}
        loading={loading}
        src={docViewerConfig[0]?.uri}
        DocViewerRenderers={DocViewerRenderers}
      />
    </>
  );
};

MainFileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  favourite: PropTypes.bool.isRequired,
  onClickFavourite: PropTypes.func.isRequired,
  isDisableFavourite: PropTypes.bool.isRequired,
  removeFavourite: PropTypes.bool.isRequired,
  onClickRemoveFavourite: PropTypes.func.isRequired,
  isDisableRemoveFavourite: PropTypes.bool.isRequired,
  rename: PropTypes.bool.isRequired,
  onClickRename: PropTypes.func.isRequired,
  isDisableRename: PropTypes.bool.isRequired,
  trash: PropTypes.bool.isRequired,
  onClickTrash: PropTypes.func.isRequired,
  isDisableTrash: PropTypes.bool.isRequired,
  selectedIDS: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  deleteTrash: PropTypes.bool,
  onClickDeleteTrash: PropTypes.func,
  isDisableDeleteTrash: PropTypes.bool,
  restoreTrash: PropTypes.bool,
  onClickRestoreTrash: PropTypes.func,
  isDisableRestoreTrash: PropTypes.bool,
  refetch: PropTypes.bool.isRequired,
  setRefetch: PropTypes.func.isRequired,
  share: PropTypes.bool,
  download: PropTypes.bool,
  move: PropTypes.bool,
  sort: PropTypes.bool,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default MainFileCard;
