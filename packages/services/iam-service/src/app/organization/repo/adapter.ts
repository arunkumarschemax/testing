import { Injectable } from "@nestjs/common";
import { OrganizationDto } from "../dtos/organization.dto";
import { Organization } from "../entities/organization.entity";
import { DropdownOrganizationDto, GetAllOrganizations } from "@finestchoicex-iam/shared-services";


@Injectable()
export class OrganizationAdapter {
    convertDtotoEntity(orgDto: OrganizationDto): Organization {
        const entity = new Organization();
        entity.name = orgDto.name;
        entity.description = orgDto.description;
        if (orgDto.organizationId) {
            entity.uuid = orgDto.organizationId;
        }
        return entity;
    }

    convertEntitytoDdto(req: Organization): GetAllOrganizations {
        const dto = new GetAllOrganizations(req.name, req.uuid,req.description, req.versionFlag,req.isActive );
        return dto;
    }
    convertDropDownEntityToDto(req: Organization): DropdownOrganizationDto {
        const dto = new DropdownOrganizationDto(req.name, req.uuid);
        return dto;
    }

}