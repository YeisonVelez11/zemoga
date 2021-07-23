import { environment } from '../environments/environment';
export const URL = environment.url;
export const WEBSERVICE = {
  RULINGS_GET: URL + 'list',
  RULING_UPDATE: URL + 'update_ruling',

};
