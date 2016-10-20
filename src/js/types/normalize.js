// @flow
type NumberMap<T> = { [key: number]: T };

// P - Plural
// S - Singular
// T - Type
// I - Id
export type SingleNormalized<P, S, T, I> = {
  entities: { [key: P]: NumberMap<T> };
  result: { [key: S]: I };
};
