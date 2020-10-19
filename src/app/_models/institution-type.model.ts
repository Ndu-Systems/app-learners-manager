import { Grade } from './grade.model';

export interface InstitutionTypeModel {
    InstituteTypeId: string;
    Name: string;
    OnceOffPrice?: string;
    MonthlyPrice?: string;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: string;
    Grades?: Grade[];
}
