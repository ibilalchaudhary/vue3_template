import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  authenticationScheme?: string;
}

// upload files
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // document
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export interface RequestOptions {
  // request parameters are spliced ​​to the url
  joinParamsToUrl?: boolean;
  // format request parameter time
  formatDate?: boolean;
  // Whether to display the prompt information
  isShowMessage?: boolean;
  // Whether to parse into JSON
  isParseToJson?: boolean;
  // success text message
  successMessageText?: string;
  // Whether to display success information
  isShowSuccessMessage?: boolean;
  // Whether to display failure information
  isShowErrorMessage?: boolean;
  // wrong text message
  errorMessageText?: string;
  // whether to add url
  joinPrefix?: boolean;
  // Interface address, if not filled, use the default apiUrl
  apiUrl?: string;
  // request splicing path
  urlPrefix?: string;
  // error message prompt type
  errorMessageMode?: 'none' | 'modal';
  // whether to add timestamp
  joinTime?: boolean;
  // don't do anything, just return
  isTransformResponse?: boolean;
  // Whether to return native response headers
  isReturnNativeResponse?: boolean;
  // ignore duplicate requests
  ignoreCancelToken?: boolean;
  // Whether to carry the token
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  message: string;
  result?: T;
}
