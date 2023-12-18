import { CommonRequestAttrs } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";


export class OrganizationIdReqDto extends CommonRequestAttrs{
    @ApiProperty()
    organizationId:number;
    constructor(username: string, userId: number, organizationId: number) {
        super(username, userId);
        this.organizationId = organizationId;
    }
}