// @flow
export function isValid(value: any): boolean {
  return !!(value || value === 0);
}
