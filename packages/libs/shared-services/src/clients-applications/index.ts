import { ApplicationIdReqDto, ClientAppsDto, CommonResponse, OrganizationReqDto } from "@finestchoicex-iam/shared-models";
import { CommonAxiosService } from "../common-axios-service";
import { AxiosRequestConfig } from "axios";

export class ClentAppsService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/client-apps/' + childUrl;
    }

    async mapOrUnMapAppsToClient(createDto: ClientAppsDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('mapOrUnMapAppsToClient'), createDto, config);
    }
    async getAllAppsByApplicationId(req:ApplicationIdReqDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllAppsByApplicationId'), req, config);
    };
}