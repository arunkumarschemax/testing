import { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from './axios-instance';
import { config } from './config';

export class CommonAxiosService {
    URL = config.APP_WMS_SERVICE_URL;
    axiosPostCall = async (urlEndPoint: string, data?: any, config?: AxiosRequestConfig) => {
        return await AxiosInstance.post(this.URL + '' + urlEndPoint, data, config)
            .then(response => {
                if (response && (response.status >= 200 && response.status < 300)) {
                    return response.data;
                } else {
                    throw response;
                }
            }).catch(err => {
                throw new Error(err.message);
            })
    }
}