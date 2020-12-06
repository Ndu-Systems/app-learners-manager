export class ChangePasswordModel {
  Email: string;
  Password?: string;
  ConfirmPassword?: string;
}


export interface TokenModel {
  Token: string;
}

export interface EmailGetRequestModel {
  Email: string;
}


export interface RoleSignUpModel {
  Name?: string;
}

export interface GradeSignUpModel {
  GradeId?: string;
}
export interface SignUpModel {
  Email: string;
  UserToken?: string;
  Password: string;
  PhoneNumber: string;
  Name: string;
  CompanyName: string;
  Surname: string;
  GradeId: string;
  UserType: string;
  CreateUserId: string;
  ModifyUserId: string;
  IsDeleted: number;
  StatusId: number;
  Roles?: RoleSignUpModel[];
  InstitutionTypeId: string;
  Grades?: GradeSignUpModel[];
}

