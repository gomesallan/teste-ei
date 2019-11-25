import axios from 'axios';

const api = axios.create({ baseURL: 'http://eidoctor.com/slim' });

export default api;