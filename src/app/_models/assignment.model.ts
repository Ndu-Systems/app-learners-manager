import { ImageModel } from './image.model';

export interface Assignment {
  AssignmentId?: string;
  Tittle: string;
  GradeId: string;
  SubjectId: string;
  Instructions: string;
  Points: number;
  DueDate: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Images?: ImageModel[];
}