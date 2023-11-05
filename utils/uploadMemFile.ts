import { UploadApiOptions } from "cloudinary";
import { uploadStream } from "./uploadStream";

const dataTypes: any = {
  image: "images",
  video: "videos",
};

export default async function uploadMemFile(file: File) {
  const fileTypeExt = file.type;
  const fileType = fileTypeExt.split("/")[0];
  const isVideo = fileType === "video";

  const resource_type = isVideo ? "video" : undefined;
  const format = fileTypeExt === "image/gif" ? "mp4" : undefined;

  const options: UploadApiOptions = {
    resource_type,
    unique_filename: true,
    overwrite: false,
    format,
    folder: "upload/" + dataTypes[fileType],
  };
  try {
    const uploadResult = await uploadStream(file, options);

    return uploadResult.public_id;
  } catch (err: any) {
    throw new Error("Internal error");
  }
}
