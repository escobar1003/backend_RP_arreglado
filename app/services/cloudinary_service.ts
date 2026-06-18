import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default class CloudinaryService {
  static async uploadImage(filePath: string, folder: string = 'recycling') {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'image',
    })
    return result.secure_url
  }

  static async deleteImage(publicId: string) {
    await cloudinary.uploader.destroy(publicId)
  }
}