export interface IImageFormater {
   
    crop({imageBuffer,aspectRatio,format}:{imageBuffer: Buffer, aspectRatio: number,format:'jpeg'|'png'}):Promise<Buffer>
  
}
