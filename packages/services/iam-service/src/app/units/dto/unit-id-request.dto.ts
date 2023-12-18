import { CommonRequestAttrs } from '@finestchoicex-iam/shared-models';
import { ApiProperty } from '@nestjs/swagger';

export class UnitIdDto extends CommonRequestAttrs{
    @ApiProperty()
    unitId: number;
    constructor(username: string, userId: number, unitId: number){
        super (username, userId)
        this.unitId= unitId;
    }


}
