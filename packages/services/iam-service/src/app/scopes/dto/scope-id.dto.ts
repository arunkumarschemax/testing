import { CommonRequestAttrs } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";

export class ScopesIdDto extends CommonRequestAttrs{
    @ApiProperty()
    scopeId:number;
    constructor(username: string, userId: number, scopeId: number) {
        super(username, userId);
        this.scopeId = scopeId;
    }
}