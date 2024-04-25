import * as fs from 'fs'
import * as path from 'path'
import { FileUploadResponse } from "../../interface/file.interface";
import { GraphQLContext } from "../../context";

export default {
  async uploadFile(parent: unknown, { file }: { file: File }, context: GraphQLContext): Promise<FileUploadResponse> {
    try {

      const fileArrayBuffer: ArrayBuffer = await file.arrayBuffer()
      const uploadPath = process.env.UPLOAD_PATH || ''
      const fullPath = path.join(uploadPath, file.name)

      fs.writeFileSync(fullPath, Buffer.from(fileArrayBuffer))

      return {
        success: true,
        path: fullPath,
        message: 'Upload Complete!'
      }

    } catch (error: any) {
      return {
        success: false,
        path: null,
        message: error.message
      }
    }

  }
}