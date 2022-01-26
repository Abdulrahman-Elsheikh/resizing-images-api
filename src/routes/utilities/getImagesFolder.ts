// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';
// Import The Path Package
import path from 'path';

// Get The Image Folder Name
export const getFolderName = async (name: string): Promise<string> => {
  let folderName = '';
  const folderContents: string[] = fs.readdirSync(name);
  if (folderContents.includes('images')) {
    folderName = path.join(name, 'images');
    return folderName;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    folderName = await getFolderName(path.join(name, '..'));
    return folderName;
  }
};
