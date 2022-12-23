import axios from './axios';

const uploadPhoto = (data = {}) => axios.post('/PhotoUpload/UploadPhoto', data.data|| {}, {
  params: data.params || {},
});

export default {
  uploadPhoto,
};
