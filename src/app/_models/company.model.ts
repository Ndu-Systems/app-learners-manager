import { Grade } from './grade.model';
import { InstitutionTypeModel } from './institution-type.model';

export interface CompanyModel {
    CompanyId: string;
    Name: string;
    Handler: string;
    Description: string;
    Dp: string;
    IsDeleted: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    Institutions: Institution[];
}

export interface Institution {
    CompanyId: string;
    Name: string;
    Handler: string;
    Description: string;
    Dp: string;
    IsDeleted: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    InstitutionType: InstitutionTypeModel;
    Grades: Grade[];
}

