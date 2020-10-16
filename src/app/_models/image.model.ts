export interface ImageModel {
  ImageId?: string;
  Url: string;
  OtherId?: string;
  IsDeleted?: boolean;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  StatusId?: number;

  // front-end parameters.
  About?: string;
}
