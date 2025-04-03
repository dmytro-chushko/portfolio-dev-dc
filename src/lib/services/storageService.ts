import storageClient from '../clients/supabaseClient';
import { UploadFileType } from '../types/storage/UploadFileType';

const bucket = process.env.SUPABASE_STORAGE_BUCKET_NAME;
// const folder = process.env.SUPABASE_STORAGE_FOLDER_NAME;

export const uploadFileService = async ({ path, fileBody }: UploadFileType) => {
  const { data, error } = await storageClient.storage
    .from(bucket)
    .upload(path, fileBody);

  if (error) return error;

  return data;
};
