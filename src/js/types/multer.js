type MulterBaseFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
};

export type MulterMemoryFile = $All<MulterBaseFile, {
  buffer: Buffer;
}>;
