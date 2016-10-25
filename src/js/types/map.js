// @flow
export type TypeMap<K, T> = { [key: K]: T };
export type NumberMap<T> = TypeMap<number, T>;
export type StringMap<T> = TypeMap<string, T>;
