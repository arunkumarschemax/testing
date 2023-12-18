import { AxiosRequestConfig } from "axios";
import { CommonResponse, UsersIdDto, UserRolesResponse, UserRoleDto } from '@finestchoicex-iam/shared-models';
import { CommonAxiosService } from "../common-axios-service";


export class UserRoleMappingService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/user-roles/' + childUrl;
    };
    async mapOrUnMapRolesToUser(createDto: UserRoleDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('mapOrUnMapRolesToUser'), createDto, config);
    };

    async getAllRolesByUserId(req: UsersIdDto, config?: AxiosRequestConfig): Promise<UserRolesResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllRolesByUserId'), req, config);
    };

}