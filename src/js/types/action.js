// @flow
export type Action<T> = {
  type: T;
  error?: boolean;
};

export type MetaAction<T, M> = $All<Action<T>, {
  meta: M;
}>;

export type PayloadAction<T, P> = $All<Action<T>, {
  payload: P;
}>;

export type PayloadWithMetaAction<T, P, M> = $All<PayloadAction<T, P>, {
  meta: M;
}>;

export type ErrorAction<T, P> = {
  type: T;
  payload: P;
  error: true;
};

export type ErrorWithMetaAction<T, P, M> = $All<ErrorAction<T, P>, {
  meta: M;
}>;
