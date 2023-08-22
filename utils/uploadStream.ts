import { Readable } from "stream";
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

export async function uploadStream(buffer: Buffer, options: UploadApiOptions) {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => {
        if (err) return rej(err);
        res(result as UploadApiResponse);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  }) as Promise<UploadApiResponse>;
}
