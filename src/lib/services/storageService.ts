import storageClient from '../clients/supabaseClient';
import StorageError from '../errors/StorageError';
import { FileResponseType } from '../types/storage';
import { UploadFileType } from '../types/storage/UploadFileType';
import { storageErrorTypeGuard } from '../utils/storageErrorTypeGuard';

const bucket = process.env.SUPABASE_STORAGE_BUCKET_NAME;
const folder = process.env.SUPABASE_STORAGE_FOLDER_NAME;

export const uploadFile = async ({
  path = folder,
  fileBody,
}: UploadFileType): Promise<FileResponseType> => {
  const { data, error } = await storageClient.storage
    .from(bucket)
    .upload(`${path}/${fileBody.name}`, fileBody, {
      contentType: fileBody.type,
    });

  if (error) {
    if (storageErrorTypeGuard(error)) throw new StorageError(error);
    throw error;
  }

  return data;
};
