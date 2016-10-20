// @flow
type NumberMap<T> = { [key: number]: T };

// P - Plural
// S - Singular
// T - Type
// I - Id
export type ArrayNormalized<P, T, I> = {
  entities: { [key: P]: NumberMap<T> };
  result: { [key: P]: Array<I> };
};

export type SingleNormalized<P, S, T, I> = {
  entities: { [key: P]: NumberMap<T> };
  result: { [key: S]: I };
};
