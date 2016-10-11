type DefaultAction<T> = {
  type: string;
  payload: T;
  error: ?Error;
};

type MetaAction<T, M> = $All<DefaultAction<T>, {
  meta: M;
}>;

export type Action = DefaultAction | MetaAction;
