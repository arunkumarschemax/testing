import { ApplicationIdReqDto, ApplicationsCreateDto, ApplicationsDropDownResponse, ApplicationsResponse, CommonResponse, ModuleDto } from "@finestchoicex-iam/shared-models";
import { CommonAxiosService } from "../common-axios-service";
import { AxiosRequestConfig } from "axios";

export class ApplicationService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/applications/' + childUrl;
    }
    async create(createDto: ApplicationsCreateDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createApplication'), createDto, config);
    }

    async getAllApplications(config?: AxiosRequestConfig): Promise<ApplicationsResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllApplications'), config)
    }
    
    async getAllApplicationsDropDown(config?: AxiosRequestConfig): Promise<ApplicationsDropDownResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllApplicationsDropDown'), config)
    }

    async activateOrDeactivate(deactivateDto: ApplicationIdReqDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateOrDeactivate'), deactivateDto, config)
    }
}