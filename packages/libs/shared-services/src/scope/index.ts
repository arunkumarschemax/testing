import { AxiosRequestConfig } from "axios";
import { CommonAxiosService } from "../common-axios-service";
import { ScopesCreateDto } from "packages/libs/shared-models/src/scopes/scopes-create-dto";
import { CommonResponse } from "packages/libs/shared-models/src/common/common-response";
import { GetAllScopesDropDownResponse, GetAllScopesResponse, ScopesIdDto } from "@finestchoicex-iam/shared-models";

export class ScopesService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/scopes/' + childUrl;
    }

    async createScope(createDto: ScopesCreateDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createScope'), createDto, config);
    }
    async getAllScopes(config?: AxiosRequestConfig): Promise<GetAllScopesResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllScopes'), config);
    }

    async activateAndDeactivatedScope(req: ScopesIdDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateAndDeactivatedScope'), req, config);
    }

    async getAllScopesDropDown(config?: AxiosRequestConfig): Promise<GetAllScopesDropDownResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllScopesDropDown'), config);
    }



}