// @flow
export type Action = {
  type: string;
  meta?: any;
  error?: boolean;
};

export type PayloadAction<T> = $All<Action, {
  payload: T;
}>;

export type ErrorAction<T> = {
  type: string;
  payload: T;
  meta?: any;
  error: true;
};
