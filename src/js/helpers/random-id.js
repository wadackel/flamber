// @flow
export default function randomId(): string {
  return Math.random().toString(36).slice(-8);
}
