import { Topic, TopicContent } from './topic.model';
import { Tests } from './tests.model';





export interface Subject {
    IsSelected: boolean;
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
    Lessons? : TopicContent[];
    Assignments: any[];
}



export interface Grade {
    GradeId?: string;
    CompanyId : string;
    Name?: string;
    Description?: string;
    InstitutionTypeId?: number;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: any;
    Subjects?: Subject[];
    Viewing?: boolean;
    Class?: string[];
    Grade?: any;
    CompanyGradeId?: any;
}

export interface Teachersubject {
    Id?: string;
    UserId : string;
    SubjectId: string;
    GradeId: string;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: any;
}