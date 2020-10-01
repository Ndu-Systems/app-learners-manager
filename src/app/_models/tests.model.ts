import { Subject } from './grade.model';

export interface Answer {
    AnswerId: string;
    QuestionId: string;
    Answer: string;
    IsCoorect: boolean;
    ImageUrl: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: any;
    StudentAnswer?: boolean;
}

export interface Question {
    QuestionId: string;
    TestId: string;
    SectionId: string;
    Question: string;
    Score: string;
    ImageUrl: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
    Answers: Answer[];

    CorrectAnswer?: string;
    StudentAnswer?: string;
}

export interface Section {
    TestId: string;
    SectionId?: string;
    Name: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: any;
    Questions?: Question[];
    Viewing?: boolean;
}

export interface Tests {
    TestId?: string;
    Name: string;
    TestDate: string;
    TestTime: string;
    SubjectId: string;
    FinishTime: string
    Duration: string
    Marks: number;
    CategoryId: string
    ImageUrl: string;
    ShowResultSameTime: number;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: any;
    Subject?: Subject;
    Sections?: Section[];
    Viewing?: boolean;
    StudentAnswer?: boolean;
    Questions?: Question[];
    Students?: any[];
}
