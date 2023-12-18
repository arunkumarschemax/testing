import { AxiosRequestConfig } from "axios";
import { CommonResponse, GetAllUserResponse, LoginUserDto, OrganizationReqDto, UnitIdDto, UsersCreateDto, UsersIdDto, UsersReqUpdateDto, UsersResponse, UsersTypeResponse } from '@finestchoicex-iam/shared-models';
import { CommonAxiosService } from "../common-axios-service";


export class UsersService extends CommonAxiosService {
    private getURLwithMainEndPoint(childUrl: string) {
        return '/users/' + childUrl;
    };
    async createUser(createDto: UsersCreateDto, config?: AxiosRequestConfig): Promise<UsersTypeResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('createUser'), createDto, config);
    };

    async getAllUsers(config?: AxiosRequestConfig): Promise<UsersResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getAllUsers'), config);
    };

    async usersUpdate(req: UsersReqUpdateDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('usersUpdate'), req, config);
    };

    async login(req: LoginUserDto, config?: AxiosRequestConfig): Promise<UsersResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('login'), req, config);
    };

    async getSalt(req: LoginUserDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getSalt'), req, config);
    };

    async logOut(req: LoginUserDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('logOut'), req, config);
    };

    async refreshJwtAccessToken(req: LoginUserDto, config?: AxiosRequestConfig): Promise<CommonResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('refreshJwtAccessToken'), req, config);
    };

    async getUserProfile() {

    };

    async getUsersByUnitId(unitIdReq: UnitIdDto, config?: AxiosRequestConfig): Promise<GetAllUserResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getUsersByUnitId'), unitIdReq, config)
    }

    async activateDeactivateUsers(req:UsersIdDto, config?: AxiosRequestConfig): Promise<GetAllUserResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('activateDeactivateUsers'), req, config)
    }

    async getUsersByOrgId(orgIdReq: OrganizationReqDto, config?: AxiosRequestConfig): Promise<GetAllUserResponse> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('getUsersByOrgId'), orgIdReq, config)
    }
}