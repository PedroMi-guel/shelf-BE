import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
    //method
    uploadFile(file: Express.Multer.File, folder: string): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const nameFolder = { folder };

            if (!validateFolderName(folder)) {
                return reject(new Error('Invalid folder name'));
            }

            const uploadStream = cloudinary.uploader.upload_stream(
                nameFolder,
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}


function validateFolderName(folder: string): boolean {
    return true;
}
