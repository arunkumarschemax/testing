import { CommonRequestAttrs } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";

export class ModuleIdReqDto extends CommonRequestAttrs {
    @ApiProperty()
    moduleId: number;
    constructor(username: string, userId: number, moduleId: number) {
        super(username, userId);
        this.moduleId = moduleId;
    }
}