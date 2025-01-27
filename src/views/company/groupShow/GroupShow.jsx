import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router';
import { getTopLevelFiles, showFolder, showGroup } from 'helper/api/company/Files';
import { toast } from 'react-toastify';
import {
  CircularProgress,
  IconButton,
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import folderImg from '../../../assets/images/filesImgs/folder.png';
import fileImg from '../../../assets/images/filesImgs/file.png';
import pdfImg from '../../../assets/images/filesImgs/pdf.png';
import docxImg from '../../../assets/images/filesImgs/docx.png';
import musicImg from '../../../assets/images/filesImgs/music.png';
import imageImg from '../../../assets/images/filesImgs/image.png';
import jsonImg from '../../../assets/images/filesImgs/json.png';
import txtImg from '../../../assets/images/filesImgs/txt.png';

const fileTypeToImg = {
  folder: folderImg,
  file: fileImg,
  documents: pdfImg,
  docx: docxImg,
  audios: musicImg,
  images: imageImg,
  json: jsonImg,
  txt: txtImg
};

const marks = [
  { value: 0, label: 'No Access' },
  { value: 1, label: 'View' },
  { value: 2, label: 'Upload' },
  { value: 3, label: 'Download Original' },
  { value: 4, label: 'Download Encryption' }
];

const permissionLevels = {
  no_access: 0,
  view: 1,
  upload: 2,
  download_original: 3,
  download_encryption: 4
};

const GroupShow = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [files, setFiles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});

  const showGroupData = async () => {
    try {
      const filesResponse = await getTopLevelFiles();
      const response = await showGroup(id);
      setGroupData(response?.result?.data);
      setFiles(filesResponse?.result?.data);
      setPermissions(
        response?.result?.data.permissions.reduce(
          (acc, perm) => ({
            ...acc,
            [perm.file.id]: permissionLevels[perm.permission]
          }),
          {}
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showGroupData();
  }, [id]);

  const showFolderInners = async (folder_id) => {
    try {
      const response = await showFolder(folder_id);
      return response?.result?.data?.inners || [];
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return [];
    }
  };

  const handleToggleFolder = async (folder_id) => {
    if (expandedFolders[folder_id]) {
      setExpandedFolders((prev) => ({ ...prev, [folder_id]: false }));
    } else {
      const innerFiles = await showFolderInners(folder_id);
      setExpandedFolders((prev) => ({ ...prev, [folder_id]: innerFiles }));
    }
  };

  const FileRow = ({ file }) => (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {file.type === 'folder' && (
              <IconButton onClick={() => handleToggleFolder(file.id)}>
                <ExpandMoreIcon
                  style={{
                    transform: expandedFolders[file.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
              </IconButton>
            )}
            <img height={40} src={fileTypeToImg[file.type]} alt={file.type} />
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {file.title}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
      {expandedFolders[file.id] && (
        <TableRow>
          <TableCell colSpan={2} style={{ paddingLeft: 50, borderBottom: 'none' }}>
            <Collapse in={expandedFolders[file.id]?.length > 0} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableBody>
                  {expandedFolders[file.id].map((innerFile) => (
                    <FileRow key={innerFile.id} file={innerFile} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );

  return (
    <MainCard title={`Group Id: ${id}`}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Group Files
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Document</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                          {marks.map((mark) => (
                            <Typography key={mark.value} variant="body2">
                              {mark.label}
                            </Typography>
                          ))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {files.map((file) => (
                      <FileRow key={file.id} file={file} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </MainCard>
  );
};

export default GroupShow;
