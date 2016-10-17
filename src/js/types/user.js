// @flow
export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  provider: string;
  providerId: string;
  photo: string;
  today_upload: number;
  installed: boolean;
  created_at: Date;
  updated_at: Date;
};
