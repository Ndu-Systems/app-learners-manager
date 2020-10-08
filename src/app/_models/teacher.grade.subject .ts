import { Grade, Subject } from './grade.model';

export interface TeacherSubject {
    Id: string;
    UserId: string;
    SubjectId: string;
    GradeId: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    Subjects: Subject[];
    Grade: Grade;
}
