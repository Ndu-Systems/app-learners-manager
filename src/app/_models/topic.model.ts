import { Subject } from './grade.model';

export interface Topic {
    TopicId: string;
    SubjectId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: number;
    Viewing?: boolean;
    TopicContent?: TopicContent[];
    Subject?: Subject;
    Comments?:any;
    Students?:any;
}

export interface TopicContent {
   
    TopicId: string;
    SubjectId?: string;
    TopicContentId?: string;
    Tittle: string;
    ContentType: string;
    ContentBody: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId?: number;
    Topic?: Topic;
    Viewing?: boolean;
    Comments?: any[];
    Students?: any[];

}

export interface Topics {
    TopicId: string;
    SubjectId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    TopicContent: TopicContent[];
}