import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private async checkDirectory(directory: string) {
    const isDirectoryExists = fs.existsSync(directory);
    if (!isDirectoryExists) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  async uploadFileWithBuffer(
    file: Buffer,
    format: keyof sharp.FormatEnum | sharp.AvailableFormatInfo,
    quality = 60,
    directory: string,
    filename: string,
  ) {
    this.checkDirectory(directory);

    const uploadPath = path.join(directory, filename);

    await sharp(file).toFormat(format, { quality }).toFile(uploadPath);

    return { filePath: uploadPath };
  }

  async uploadFilesWithBuffer() {
    return Promise.all();
  }

  async deleteFile(directory: string, filename: string) {
    const filePath = path.join(directory, filename);

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
