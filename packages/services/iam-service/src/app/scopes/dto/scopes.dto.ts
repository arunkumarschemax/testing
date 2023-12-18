import { ApiProperty } from '@nestjs/swagger';

export class ScopeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

}
