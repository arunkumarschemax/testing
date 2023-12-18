import { GetAllAttributeDto } from "@finestchoicex-iam/backend-utils";
import { Injectable } from "@nestjs/common";
import { GetAllAttributeDropDown } from "packages/libs/shared-services/src/attrubutes/get-attribute-dropdown";
import { AttributeDto } from "./dtos/attribute.dto";
import { AttributesEntity } from "./entities/attributes.entity";

@Injectable()
export class AttributesAdapter {
    convertDtotoEntity(atbDto: AttributeDto): AttributesEntity {
        const entity = new AttributesEntity();
        entity.attributeName = atbDto.attributeName;
        if (atbDto.attributeId) {
            entity.uuid = atbDto.attributeId;
        }
        return entity;
    }
    convertEntitytoDdto(req: AttributesEntity): GetAllAttributeDto {
        const dto = new GetAllAttributeDto(req.attributeName, req.uuid, req.isActive, req.versionFlag);
        return dto;
    }

    convertDropDownEntityToDto(req: AttributesEntity): GetAllAttributeDropDown {
        const dto = new GetAllAttributeDropDown(req.attributeName, req.uuid);
        return dto;
    }

}