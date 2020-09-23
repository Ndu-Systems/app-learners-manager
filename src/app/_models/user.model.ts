import { Studentsubject } from './studentsubject.model';
import { Grade } from './grade.model';
import { BillingModel } from './billing.model';

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
  Studentsubject?: Studentsubject[];
  Grade?: Grade;
  Billing?: any[];
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