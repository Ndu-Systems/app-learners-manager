import { Studentsubject } from './studentsubject.model';
import { Grade, Subject } from './grade.model';
import { BillingModel } from './billing.model';
import { TeacherSubject } from './teacher.grade.subject ';

export interface User {
  UserId?: string;
  Email: string;
  Name: string;
  UserType?: string;
  Surname: string;
  GradeId?: string;
  CellphoneNumber: string;
  Address?: string;
  Password: string;
  CompanyId?: string;
  CompanyName?: string;
  RoleId?: number;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  NewPassword?: string;
  ConfirmPassword?: string;
  StatusId: any;
  UserToken?: any;
  DP?: any;
  SystemRole?: string;
  SecurityToken?: string;
  Roles?: UserRole[];
  Viewing?: boolean;
  Studentsubjects?: Studentsubject[];
  Teachersubjects: TeacherSubject[];
  Grades?: Grade[];
  Grade?: Grade;
  Billing?: any[];
  PhoneNumber: any;
}


export interface UserModel {
  Name: string;
  Surname?: string;
  Email: string;
  PhoneNumber: string;
  Password?: any;
  ImageUrl: string;
  AccessType: string;
  AccessStatus: string;
  AccessStartDate: string;
  AccessEndDate: string;
  CreateUserId: string;
  ModifyUserId: string;
  StatusId: number;
  UserToken?: any;
  Roles: Role[];
  Studentsubjects: any[];
  Teachersubjects: any[];
  Billing: BillingModel
}
export interface Role {
  Name: string;
}
export interface UserRole {
  RoleId: string;
  UserId: string;
  RoleName: string;
}