import { CommonResponse, GetAllRolePermissionsDropDownResponse, GetAllRolePermissionsResponse, RolePermDto, RolesIdReqDto } from "@finestchoicex-iam/shared-models";
import { AxiosRequestConfig } from "axios";
import { CommonAxiosService } from "../common-axios-service";

export class RolePermissionsService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/role-permissions/' + childUrl;
    }

    async mapOrUnMapRolePermissions(rolePermDto: RolePermDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('mapOrUnMapRolePermissions'), rolePermDto, config)
    }

    async getRolePermissionByRoleId(req: RolesIdReqDto, config?: AxiosRequestConfig): Promise<GetAllRolePermissionsResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getRolePermissionByRoleId'), req, config)
    }
}