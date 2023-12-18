import { CommonRequestAttrs } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";

export class AttributeIdReqDto extends CommonRequestAttrs {
    @ApiProperty()
    attributeId: number;
    constructor(username: string, userId: number, attributeId: number) {
        super(username, userId)
        this.attributeId  =attributeId;
    }
}