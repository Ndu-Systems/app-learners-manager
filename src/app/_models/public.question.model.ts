export interface PublicQuestion {
    PublicQuestionId?: string;
    Tittle: string;
    Title?: string;
    GradeId: string;
    SubjectId: string;
    QuestionBody: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
    Class?: string[];
    Comments?: any[];
}
