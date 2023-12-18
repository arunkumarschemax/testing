import { Injectable } from '@nestjs/common';
import { UserRepo } from './user-repo/user-repo';
import { UsersDto } from './dtos/user.dto';
import { CommonResponse } from '@finestchoicex-iam/backend-utils';

@Injectable()
export class UsersService {
    constructor(
        private readonly repo: UserRepo
    ) { }

    async userCreation(createRequest: UsersDto): Promise<CommonResponse> {
        const save = await this.repo.save(createRequest);
        return new CommonResponse(true, 2345, 'created successfully', save)
    }
   
}

