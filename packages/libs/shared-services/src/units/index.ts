import { AxiosRequestConfig } from "axios";
import { CommonAxiosService } from "../common-axios-service";
import { CommonResponse } from "packages/libs/shared-models/src/common/common-response";
import { GetAllUnitsDropDownResponse, GetAllUnitsResponse, OrganizationReqDto, ScopesIdDto, UnitCreateDto, UnitIdDto } from "@finestchoicex-iam/shared-models";

export class UnitsService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/units/' + childUrl;
    }

    async createUnit(createDto: UnitCreateDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createUnit'), createDto, config);
    }
    async getAllUnits(config?: AxiosRequestConfig): Promise<GetAllUnitsResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllunits'), config);
    }

    async activateAndDeactivatedUnit(req: UnitIdDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateOrDeactivateUnits'), req, config);
    }

    async getAllUnitsDropDown(req: UnitIdDto, config?: AxiosRequestConfig): Promise<GetAllUnitsDropDownResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllUnitsDropDown'), req, config);
    }

    async getUnitsByOrgId(req: OrganizationReqDto, config?: AxiosRequestConfig): Promise<GetAllUnitsResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getUnitsByOrgId'), req, config);
    }



}