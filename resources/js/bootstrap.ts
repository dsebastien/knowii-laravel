import axios from 'axios';

// @ts-expect-error
window.axios = axios;

// @ts-expect-error
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
