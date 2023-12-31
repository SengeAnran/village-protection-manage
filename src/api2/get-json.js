import * as request from '../utils/mapRequest';
import config from '@/utils/config';
// const api = process.env.VUE_APP_ENV === 'production' ? '/v2/admin' : '/admin';
const api = config.routerBase;

// 获取浙江省JSON
export const getProviceJSON = (path, params) => request.get(api + `/map/330000full.json`, params);

// 获取市级JSON
export const getCityJSON = (path, params) => request.get(api + `/map/city/${path}full.json`, params);

// 获取县区级JSON
export const getCountyJSON = (path, params) => request.get(api + `/map/county/${path}.json`, params);
