export interface IImageCroper {
   
    crop({imageBuffer,aspectRatio}:{imageBuffer: Buffer, aspectRatio: number}):Promise<Buffer>
  
}
