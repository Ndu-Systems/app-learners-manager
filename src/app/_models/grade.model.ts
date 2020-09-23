import { Topic } from './topic.model';
import { Tests } from './tests.model';





export interface Subject {
    SubjectId: string;
    GradeId: string;
    Name: string;
    PassMark: string;
    Description: string;
    ImageUrl: string;
    Code: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: number;
    Topics: Topic[];
    Tests?: Tests[];
    Viewing?: boolean;
    Grade?: Grade;
    Class?: string[];
}



export interface Grade {
    GradeId?: string;
    CompanyId : string;
    Name?: string;
    Description?: string;
    InstituteTypeId?: number;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: any;
    Subjects?: Subject[];
    Viewing?: boolean;
    Grade?: any;
}