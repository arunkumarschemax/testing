import { ApplicationIdReqDto, CommonResponse, GetAllModulesDropDownResponse, GetAllModulesResponse, ModuleDto, ModulesIdReqDto } from "@finestchoicex-iam/shared-models";
import { CommonAxiosService } from "../common-axios-service";
import { AxiosRequestConfig } from "axios";

export class ModuleService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/modules/' + childUrl;
    }
    async create(createDto: ModuleDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createModules'), createDto, config);
    }

    async getAllModules(config?: AxiosRequestConfig): Promise<GetAllModulesResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllModules'), config)
    }

    async getAllModulesDropDownByAppId(appIdReq: ApplicationIdReqDto, config?: AxiosRequestConfig): Promise<GetAllModulesDropDownResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllModulesDropDownByAppId'), appIdReq, config)
    }

    async getAllModulesByAppId(appIdReq: ApplicationIdReqDto, config?: AxiosRequestConfig): Promise<GetAllModulesResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllModulesByAppId'), appIdReq, config)
    }

    async activateOrDeactivate(deactivateDto: ModulesIdReqDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateOrDeactivate'), deactivateDto, config)
    }
}