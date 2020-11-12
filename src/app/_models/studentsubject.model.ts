import { Subject } from './grade.model';

export interface Studentsubject {
    Id: string;
    UserId: string;
    SubjectId: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    Subject: Subject;
    Lessons?: any[];
    Tests?: any[];
    Assignments?: any[];
    Name?: string;
}
