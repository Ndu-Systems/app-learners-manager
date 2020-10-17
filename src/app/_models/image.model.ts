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
  Ext?: string;

  // front-end parameters.
  About?: string;
}
