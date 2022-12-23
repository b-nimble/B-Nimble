import axios from './axios';

const getSchoolGroupInformation = (data = {}) => axios.get('/SchoolGroup/GetSchoolGroupInformation', {
  params: data.params || {},
}).then(response => { console.log(response)});

const saveSchoolGroupInformation = (data = {}) => axios.post('/SchoolGroup/SaveSchoolGroupInformation', {
  params: data.params || {},
});

const getSchoolGroupMembersInformation = (data = {}) => axios.get('/SchoolGroup/GetSchoolGroupMembersInformation', {
    params: data.params || {},
  });

const setSchoolGroupLimit = (data = {}) => axios.get('/SchoolGroup/SetSchoolGroupLimit', {
    params: data.params || {},
  });

export default {
    getSchoolGroupInformation,
    saveSchoolGroupInformation,
    getSchoolGroupMembersInformation,
    setSchoolGroupLimit,

};