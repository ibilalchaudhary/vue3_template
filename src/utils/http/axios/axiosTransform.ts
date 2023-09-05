/**
 * Data processing class, which can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: The request was processed successfully
   */
  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: request failure handling
   */
  requestCatch?: (e: Error) => Promise<any>;

  /**
   * @description: the interceptor before the request
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  /**
   * @description: the interceptor after the request
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: Interceptor error handling before request
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: Interceptor error handling after request
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
