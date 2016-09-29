export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  provider: string;
  providerId: string;
  todayUpload: number;
  installed: boolean;
  created_at: Date;
  updated_at: Date;
};
