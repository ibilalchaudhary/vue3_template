// axios configuration can be changed according to the project, just change this file, other files can be left unchanged
import { VAxios } from './Axios';
import { AxiosTransform } from './axiosTransform';
import axios, { AxiosResponse } from 'axios';
import { checkStatus } from './checkStatus';
import { joinTimestamp, formatRequestDate } from './helper';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { PageEnum } from '@/enums/pageEnum';

import { useGlobSetting } from '@/hooks/setting';

import { isString } from '@/utils/is/';
import { deepMerge, isUrl } from '@/utils';
import { setObjToUrlParams } from '@/utils/urlUtils';

import { RequestOptions, Result, CreateAxiosOptions } from './types';

import { useUserStoreWidthOut } from '@/store/modules/user';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix || '';

import router from '@/router';
import { storage } from '@/utils/Storage';
/**
 * @description: Data processing, easy to distinguish between various processing methods
 */
const transform: AxiosTransform = {
  /**
   * @description: Process request data
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;

    // Whether to return native response headers For example: use this property when you need to get response headers
    if (isReturnNativeResponse) {
      return res;
    }
    // don't do anything, just return
    // When used for page code, it may be necessary to directly obtain code, data, and message information.
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;

    const $dialog = window['$dialog'];
    const $message = window['$message'];

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试');
    }
    // Here code, result, and message are unified fields in the background, which need to be modified to the return format of the project's own interface
    const { code, result, message } = data;
    // request succeeded
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    // Whether to display the prompt information
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // Whether to display custom information prompt
        $dialog.success({
          type: 'success',
          content: successMessageText || message || 'The operation was successful! ',
        });
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // Whether to display custom information prompt
        $message.error(message || errorMessageText || 'The operation failed!');
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // When errorMessageMode='custom-modal', the modal error pop-up window will be displayed instead of the message prompt, which is used for some more important errors
        $dialog.info({
          title: 'Tips',
          content: message,
          positiveText: 'OK',
          onPositiveClick: () => {},
        });
      }
    }

    // The interface request is successful, and the result is returned directly
    if (code === ResultEnum.SUCCESS) {
      return result;
    }
    // The interface request is wrong, and the error message is displayed uniformly. The logic here can be modified according to the project
    let errorMsg = message;
    switch (code) {
      // Request failed
      case ResultEnum.ERROR:
        $message.error(errorMsg);
        break;
      // login timeout
      case ResultEnum.TIMEOUT:
        const LoginName = PageEnum.BASE_LOGIN_NAME;
        const LoginPath = PageEnum.BASE_LOGIN;
        if (router.currentRoute.value?.name === LoginName) return;
        // go to the login page
        errorMsg = 'Login timed out, please log in again!';
        $dialog.warning({
          title: 'Tips',
          content: 'The login identity has expired, please log in again!',
          positiveText: 'OK',
          //negativeText: 'Cancel',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {
            storage.clear();
            window.location.href = LoginPath;
          },
          onNegativeClick: () => {},
        });
        break;
    }
    throw new Error(errorMsg);
  },

  // Process config before request
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    const isUrlStr = isUrl(config.url as string);

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // Add timestamp parameter to get request to avoid getting data from cache.
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // Compatible with restful style
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // Compatible with restful style
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: Request interceptor processing
   */
  requestInterceptors: (config, options) => {
    // Process config before request
    const userStore = useUserStoreWidthOut();
    const token = userStore.getToken;
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: response error handling
   */
  responseInterceptorsCatch: (error: any) => {
    const $dialog = window['$dialog'];
    const $message = window['$message'];
    const { response, code, message } = error || {};
    // TODO here should be modified according to the back-end interface return format
    const msg: string =
      response && response.data && response.data.message ? response.data.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        $message.error('The interface request timed out, please refresh the page and try again!');
        return;
      }
      if (err && err.includes('Network Error')) {
        $dialog.info({
          title: 'Network exception',
          content: 'Please check if your network connection is normal',
          positiveText: 'OK',
          //negativeText: 'Cancel',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {},
          onNegativeClick: () => {},
        });
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as any);
    }
    // whether the request was canceled
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, 'The request was cancelled!');
    }
    //return Promise.reject(error);
    return Promise.reject(response?.data);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        authenticationScheme: '',
        // interface prefix
        prefixUrl: urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // data processing method
        transform,
        // Configuration items, the following options can be overridden in independent interface requests
        requestOptions: {
          // add prefix to url by default
          joinPrefix: true,
          // Whether to return native response headers For example: use this property when you need to get response headers
          isReturnNativeResponse: false,
          // need to process the returned data
          isTransformResponse: true,
          //Add parameters to the url when post request
          joinParamsToUrl: false,
          // format submit parameter time
          formatDate: true,
          // message type
          errorMessageMode: 'none',
          // interface address
          apiUrl: globSetting.apiUrl,
          // interface splicing address
          urlPrefix: urlPrefix,
          // Whether to add timestamp
          joinTime: true,
          // ignore duplicate requests
          ignoreCancelToken: true,
          // Whether to carry the token
          withToken: true,
        },
        withCredentials: false,
      },
      opt || {}
    )
  );
}
export const http = createAxios();

// Project, multiple different api addresses, export multiple directly here
// The interface in src/api ts, you can use this request alone,
// import { httpTwo } from '@/utils/http/axios'
// export const httpTwo = createAxios({
// requestOptions: {
// apiUrl: 'http://localhost:9001',
// urlPrefix: 'api',
// },
// });
