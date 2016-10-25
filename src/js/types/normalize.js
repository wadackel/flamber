// @flow
import type { StringMap } from "./map";

// P - Plural
// S - Singular
// T - Type
// I - Id
export type ArrayNormalized<P, T, I> = {
  entities: { [key: P]: StringMap<T> };
  result: { [key: P]: Array<I> };
};

export type SingleNormalized<P, S, T, I> = {
  entities: { [key: P]: StringMap<T> };
  result: { [key: S]: I };
};
