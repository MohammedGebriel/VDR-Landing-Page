import axios from 'axios';
import axiosInstance from '../../../axiosInstance';
import Cookies from 'js-cookie';

export const uploadFile = async (file, folder_id) => {
  const response = await axiosInstance.post(
    '/manager/file/store',
    {
      'files[0]': file,
      folder_id: folder_id
    },

    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};
export const getTopLevelFiles = async () => {
  const response = await axiosInstance.get('/manager/folders');
  return response.data;
};
export const getTrash = async () => {
  const response = await axiosInstance.get('/manager/file/recyclebin');
  return response.data;
};
export const getFavourites = async () => {
  const response = await axiosInstance.get('/manager/file/favorite');
  return response.data;
};
export const showFolder = async (folder_id) => {
  const response = await axiosInstance.post('/manager/folder/show', {
    folder_id
  });
  return response.data;
};
export const createFolder = async (title, parent_id) => {
  const response = await axiosInstance.post('/manager/folder/create', {
    title,
    parent_id
  });
  return response.data;
};
export const createFile = async (file, folder_id) => {
  const response = await axiosInstance.post(
    '/manager/file/store',
    {
      file,
      folder_id
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};
export const moveFile = async (files_id, folder_id) => {
  const response = await axiosInstance.post('/manager/files/move', {
    files_id,
    folder_id
  });
  return response.data;
};
export const renameFolder = async (file_id, title) => {
  const response = await axiosInstance.post('/manager/file/rename', {
    file_id,
    title
  });
  return response.data;
};
export const trashFolder = async (files_id) => {
  const response = await axiosInstance.post(`/manager/file/delete`, {
    files_id
  });
  return response.data;
};
export const favouriteFolder = async (file_ids) => {
  const response = await axiosInstance.post(`/manager/file/fav`, {
    file_ids
  });
  return response.data;
};
export const removeFavouriteFolder = async (file_ids) => {
  const response = await axiosInstance.post(`/manager/file/fav/remove`, {
    file_ids
  });
  return response.data;
};
export const zipFolders = async (files) => {
  const response = await axiosInstance.post(`/manager/folders/zip`, {
    files
  });
  return response.data;
};
export const unZipFolders = async (file_id) => {
  const response = await axiosInstance.post(`/manager/files/unzip`, {
    file_id
  });
  return response.data;
};
export const deleteFromTrash = async (files_id) => {
  const response = await axiosInstance.post(`/manager/file/recyclebin/delete`, {
    files_id
  });
  return response.data;
};
export const restoreFromTrash = async (files_id) => {
  const response = await axiosInstance.post(`/manager/file/recyclebin/restore`, {
    files_id
  });
  return response.data;
};
export const showFile = async (file_id) => {
  const token = Cookies.get('token');
  const prepareResponse = await axiosInstance.post(`/manager/file/preview`, {
    file_id,
    method: 'show'
  });
  const response = await axios.get(`${prepareResponse?.data?.result?.data?.path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob'
  });

  return response;
};
export const downloadFile = async (file_id) => {
  const token = Cookies.get('token');
  const prepareResponse = await axiosInstance.post(`/manager/file/preview`, {
    file_id,
    method: 'show'
  });
  const response = await axios({
    method: 'get',
    url: prepareResponse?.data?.result?.data?.path,
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob'
  });
  return response;
};
export const shareFile = async (file_id, emails) => {
  const token = Cookies.get('token');
  const prepareResponse = await axiosInstance.post(`/manager/file/share`, {
    file_id,
    emails: emails
  });

  const response = await axios({
    method: 'post',
    url: prepareResponse?.data?.result?.data?.path,
    data: { email: emails[0] },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};
export const sortFile = async (file_id, sorting) => {
  const response = await axiosInstance.post('/manager/file/sort', {
    file_id,
    sorting
  });
  return response.data;
};
export const getSpace = async () => {
  const response = await axiosInstance.get('/manager/reports/total-space-used');
  return response.data;
};
export const getAudios = async () => {
  const response = await axiosInstance.get('/manager/reports/audio');
  return response.data;
};
export const getImages = async () => {
  const response = await axiosInstance.get('/manager/reports/images');
  return response.data;
};
export const getDocuments = async () => {
  const response = await axiosInstance.get('/manager/reports/documents');
  return response.data;
};
export const getVidoes = async () => {
  const response = await axiosInstance.get('/manager/reports/video');
  return response.data;
};
export const getGroups = async () => {
  const response = await axiosInstance.get('/manager/group');
  return response.data;
};
export const addGroup = async (data) => {
  const response = await axiosInstance.post('/manager/group', { ...data });
  return response.data;
};
export const updateGroup = async (id, data) => {
  const response = await axiosInstance.put(`/manager/group/${id}`, { ...data });
  return response.data;
};
export const showGroup = async (id) => {
  const response = await axiosInstance.get(`/manager/group/${id}`);
  return response.data;
};
export const deleteGroup = async (id) => {
  const response = await axiosInstance.delete(`/manager/group/${id}`);
  return response.data;
};
export const asignMember = async (group_id, member_id) => {
  const response = await axiosInstance.post(`/manager/members/assign-group`, {
    group_id,
    member_id
  });
  return response.data;
};
export const unAsignMember = async (group_id, member_id) => {
  const response = await axiosInstance.post(`/manager/members/unassign-group`, {
    group_id,
    member_id
  });
  return response.data;
};
export const addPermission = async (data) => {
  const response = await axiosInstance.post(`/manager/group/permission`, {
    ...data
  });
  return response.data;
};
export const deletePermission = async (data) => {
  const response = await axiosInstance.post(`/manager/group/permission/delete`, {
    ...data
  });
  return response.data;
};
