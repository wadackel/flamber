type UUIDBuffer = Array<any> | Buffer;

type V1Options = {
  node: Array<any>;
  clockseq: number;
  msecs: Date | number;
  nsecs: number;
};

type V4Options = {
  random: number;
  rng: Function;
};

declare module "node-uuid" {
  declare function v1(options?: V1Options, buffer?: UUIDBuffer, offset?: number): string;
  declare function v4(options?: V4Options, buffer?: UUIDBuffer, offset?: number): string;
}
