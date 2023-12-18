import { CommonResponse, ErrorResponse, LogActions, LoggerInstantiation } from '@finestchoicex-iam/backend-utils';
import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dtos/jwt.payload';
import { LoginUserDto } from './dtos/user-login.dto';
import * as bcrypt from 'bcrypt';



const configService = new ConfigService();
configService.loadFromEnv();
@Injectable()
@LoggerInstantiation(configService.get().logLevel)
export class AuthenticationsService {
    constructor(
        private repository: AuthenticationRepository,
        private readonly jwtService: JwtService,
    ) { }

    @LogActions({ isAsync: true })
    async getSalt(username: string): Promise<CommonResponse> {
        // const user = await this.repository.findOne({ email: username });
        // if (!user) {
        //     throw new ErrorResponse(132, 'User not found');
        // }
        return new CommonResponse(true, 66666, "User Was Updated Successfully")
    }

    @LogActions({ isAsync: true })
    async validateUser(username: string, password: string): Promise<any> {
        // const user = await this.repository.findOne({ email: username });
        // if (!user) {
        //     throw new UnauthorizedException('Invalid credentials');
        // }

        // const isPasswordValid = password === user.password;
        // if (!isPasswordValid)
        //     throw new UnauthorizedException('Invalid credentials');
        // delete user.password;
        // delete user.salt;
        // delete user.currentHashedRefreshToken;
        // return { ...user };
    }


    @LogActions({ isAsync: true })
    async login(req: any, @Res() response: Response): Promise<any> {
        const { user } = req;
        const userData: JwtPayload = { id: user.usersId, fullName: user.fullName, username: user.email, phone: '' };
        const accessToken = this.generateAccessToken(userData);
        const refreshToken = this.generateRefreshToken(userData);
        await this.setCurrentRefreshToken(refreshToken, user.usersId);

    }

    @LogActions({ isAsync: true })
    async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
        // const user = await this.repository.findOne({ email: username });
        // if (!user)
        //     return null;
        // const isRefreshTokenMatching = await bcrypt.compare(
        //     refreshToken,
        //     user.currentHashedRefreshToken
        // );
        // if (isRefreshTokenMatching) {
        //     delete user.password;
        //     delete user.salt;
        //     delete user.currentHashedRefreshToken;
        //     return { ...user };
        // }
        return null;
    }

    @LogActions({ isAsync: true })
    async logOut(loginUserDto: LoginUserDto, @Res() response: Response): Promise<any> {
        // await this.repository.update({ usersId: loginUserDto.username }, {
        //     currentHashedRefreshToken: null
        // });
        // response.clearCookie('tokens-data');
        // return response.send(new CommonResponse(true, 66666, "Authentication Has Been Successfully Done"));
    }

    generateAccessToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload, {
            secret: configService.get().jwtConfig.jwtSecret,
            expiresIn: `${configService.get().jwtConfig.jwtExpiryTime}`
        });
        return token;
    }

    generateRefreshToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload, {
            secret: configService.get().jwtConfig.refreshSecret,
            expiresIn: `${configService.get().jwtConfig.refreshExpiryTime}`
        });
        return token;
    }



    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        // await this.repository.update({ usersId: userId }, {
        //     currentHashedRefreshToken
        // });
    }

    @LogActions({ isAsync: true })
    async refreshJwtAccessToken(req: any, @Res() response: Response): Promise<any> {
        const { user } = req;
        const userData: JwtPayload = { id: user.usersId, fullName: user.fullName, username: user.email, phone: '' };
        const accessToken = this.generateAccessToken(userData);
        const refreshToken = req?.cookies['tokens-data'].refreshToken;
        const secretData = {
            accessToken,
            refreshToken
        }
        // response.cookie('tokens-data', secretData, {
        //     httpOnly: true,
        //     expires: new Date(new Date().getTime() + 86409000),
        // });
        // return response.send(new CommonResponse(true, 66666, "Authentication has been Successfully done", secretData))
    }
}
