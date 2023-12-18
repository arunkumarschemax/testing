import { LoginUserDto, UserPermissionsDto } from '@finestchoicex-iam/shared-models';
import { UsersService } from '@finestchoicex-iam/shared-services';
import { ActionTypes } from "./action-types";
import { AuthActions, AuthPayLoadObject } from "./reducers";
// import bcrypt from 'bcryptjs';

export const loginUser = async (dispatch: React.Dispatch<AuthActions>, loginPayload: LoginUserDto) => {
    const service = new UsersService();
    const fileUploadPath = window[`_env_`]['APP_MDM_SERVICE_URL'];

    try {
        dispatch({ type: ActionTypes.REQUEST_LOGIN });
        // Hash the password before sending it to the server
        const saltRes = await service.getSalt({ username: loginPayload.username, password: `SaiResources${Math.random()}` })
        if (saltRes.status) {
            //const hashedPassword = await bcrypt.hash(loginPayload.password, saltRes.data.salt)
            const res = await service.login({ ...loginPayload, password: loginPayload.password });
            if (res.status) {
                const aaa: any = res.data;
                localStorage.setItem('token', aaa.accessToken);
                const menuData: UserPermissionsDto = aaa.accessMenuObj;
                const data: AuthPayLoadObject = {
                    loading: false,
                    isAuthenticated: true,
                    user: {
                        id: menuData.userId,
                        userName: menuData.userName,
                        profilePicPath: aaa?.['filesData']?.[0]?.filePath?.slice(7) ? fileUploadPath + '/' + aaa?.['filesData']?.[0]?.filePath?.slice(7) : undefined,
                        roles: menuData.roleName ? menuData.roleName.join(',') : '',
                    },
                    defaultPlant: 'SRPL',
                    defaultPlantCurrency: 'IDR',
                    token: aaa.accessToken,
                    menuAccessObject: menuData.menusData,
                    errorMessage: null
                }
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
                localStorage.setItem('currentUser', JSON.stringify(data));
                return data
            } else {
                throw Error(res.internalMessage);
            }
        } else {
            throw Error(saltRes.internalMessage);
        }
    } catch (error: any) {
        const errorMessage: any = { errorMessage: error.message };
        dispatch({ type: ActionTypes.LOGIN_ERROR, payload: errorMessage });
        throw Error(error.message);
    }
}

export const logout = async (dispatch: React.Dispatch<AuthActions>) => {
    dispatch({ type: ActionTypes.LOGOUT });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}