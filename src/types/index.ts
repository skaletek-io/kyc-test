export type ListType = {
  label: string;
  value: string;
  icon?: string;
};

export interface ColorShades {
  DEFAULT?: string;
  [shade: string]: string | undefined;
}

export interface Colors {
  [colorName: string]: string | ColorShades;
}

export type VerificationStep = "upload" | "liveness" | "doc_verify";

// Presigned Url
export type Fields = {
  key: string;
  AWSAccessKeyId: string;
  "x-amz-security-token": string;
  signature: string;
};

export type SignedUrl = {
  url: string;
  fields: Fields;
};

export type PresignedUrl = {
  front: SignedUrl;
  back: SignedUrl;
};
