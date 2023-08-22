import { Readable } from "stream";
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

export async function uploadStream(file: File, options: UploadApiOptions) {
  const fileArrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileArrayBuffer);

  cloudinary.config({
    secure: true,
  });

  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => {
        if (err) return rej(err);
        res(result as UploadApiResponse);
      }
    );
    let str = Readable.from(fileBuffer);
    str.pipe(theTransformStream);
  }) as Promise<UploadApiResponse>;
}
