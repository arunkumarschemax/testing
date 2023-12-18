import { Injectable } from '@nestjs/common';
import { ScopeDto } from './dto/scopes.dto';
import { ScopesDropDownDto, GetAllScopesDto } from '@finestchoicex-iam/shared-models';
import { ScopesEntity } from './entites/scopes.entity';


@Injectable()
export class ScopeAdapter {

    convertTotoEntity(scopeDto: ScopeDto): ScopesEntity {
        const entity = new ScopesEntity();
        entity.name = scopeDto.name;
        entity.code = scopeDto.code;
        if (scopeDto.scopeId) {
            entity.id = scopeDto.scopeId
        }
        return entity;
    }

    convertEntityToDto(scopeEntity: ScopesEntity): GetAllScopesDto {
        const dto = new GetAllScopesDto(scopeEntity.name, scopeEntity.id, scopeEntity.code, scopeEntity.isActive, scopeEntity.versionFlag);
        dto.scopeId = scopeEntity.id;
        dto.name = scopeEntity.name;
        dto.code = scopeEntity.code;
        return dto;
    }

    convertDropDownEntityToDto(scopeEntity: ScopesEntity): ScopesDropDownDto {
        const dto = new ScopesDropDownDto(scopeEntity.name, scopeEntity.id);
        
        return dto;
    }

}
