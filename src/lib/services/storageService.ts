import storageClient from '../clients/supabaseClient';
import { FileResponseType } from '../types/storage';
import { UploadFileType } from '../types/storage/UploadFileType';

const bucket = process.env.SUPABASE_STORAGE_BUCKET_NAME;
const folder = process.env.SUPABASE_STORAGE_FOLDER_NAME;

export const uploadFile = async ({
  path = folder,
  fileBody,
}: UploadFileType): Promise<Error | FileResponseType> => {
  const { data, error } = await storageClient.storage
    .from(bucket)
    .upload(`${path}/${fileBody.name}`, fileBody, {
      contentType: fileBody.type,
    });

  if (error) return error;

  return data;
};
