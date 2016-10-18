// @flow
export type Action<T> = {
  type: T;
  meta?: any;
  error?: boolean;
};

export type PayloadAction<T, P> = $All<Action<T>, {
  payload: P;
}>;

export type ErrorAction<T, P> = {
  type: T;
  payload: P;
  meta?: any;
  error: true;
};
