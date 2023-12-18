import { AxiosRequestConfig } from "axios";
import { CommonAxiosService } from "../common-axios-service";
import { CommonResponse, DropdownOrganizationResponse, GetAllOrganizationResponse, OrganizationCreateDto, OrganizationReqDto } from "@finestchoicex-iam/shared-models";

export class OrganizationService extends CommonAxiosService {


    private getURLwithMainEndPoint(childUrl: string) {
        return '/organization/' + childUrl;
    }

    async createOrganization(createDto: OrganizationCreateDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createOrganization'), createDto, config);
    }

    async getAllOrganizations(config?: AxiosRequestConfig): Promise<GetAllOrganizationResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllOrganizations'), config);
    }

    async activateOrDeactivateOrganization(req: OrganizationReqDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateOrDeactivateOrganization'), req, config);
    }

    async getAllOrganizationsDropdown(config?: AxiosRequestConfig): Promise<DropdownOrganizationResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllOrganizationsDropdown'), config);
    }
}