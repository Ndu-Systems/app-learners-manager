import { Answer, Question } from './tests.model';
import { User } from './user.model';

export interface StudentTest {
  StudentTestId?: string;
  UserId: string;
  TestId: string;
  Score: number;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Answers?: StudentAnswer[];
  User?: User;
}


export interface StudentAnswer {
  Class?: string[];
  StudentAnswerId: string;
  StudentTestId?: string;
  QuestionId: string;
  AnswerId: string;
  UserId: string;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  StatusId?: number;
  Question?: Question;

}





