import { AxiosRequestConfig } from "axios";
import { CommonAxiosService } from "../common-axios-service";
import { CommonResponse, UserRoleCreateDto } from "@finestchoicex-iam/shared-models";

export class UserRolesService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) { 
        return '/user-roles/' + childUrl;
    };
    async createUserRoles(createDto: UserRoleCreateDto, config?: AxiosRequestConfig): Promise<CommonResponse> { 
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createUserRoles'), createDto, config);
    };
}