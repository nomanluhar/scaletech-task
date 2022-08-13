import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post('http://localhost:4000/api/register',registrationData);
};

export async function onLogin(loginData) {
  return await axios.post('http://localhost:4000/api/login', loginData);
};

export async function onLogout() {
  return await axios.get('http://localhost:4000/api/logout');
};

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:4000/api/protected');
};

export async function fetchAllContacts() {
  var obj = {
    user_email : localStorage.getItem('currentUserEmail')
  };
  return await axios.post('http://localhost:4000/api/allContact',obj);
};

export async function userValidation(userInfo) {
  return await axios.get('http://localhost:4000/api/userEmailVarification',userInfo);
};

export async function OnAddContact(contactInfo) {
  return await axios.post('http://localhost:4000/api/addContact',contactInfo);
};

export async function onEditContact(contactInfo) {
  return await axios.post('http://localhost:4000/api/editContact',contactInfo);
};