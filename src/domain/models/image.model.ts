import { EImageFormat } from '../interfaces/imagesFormat.enum.ts';

export class ImageModel {
  /**
   *
   * @param id Unique identifier of the image
   * @param userId Id of the user who uploaded the image
   * @param image URL of the image
   * @param createdAt Date of creation of the image
   * @param updatedAt Date of last update of the image
   * @param format Format of the image
   * @param height Height of the image
   * @param width Width of the image
   * @param size Size of the image( height * width)
   * @param status if the image is active or not
   * @param title Title of the image
   * @param tags Tags of the image
   * @param likes Number of likes of the image
   */

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly image: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly format: EImageFormat,
    public readonly height: number,
    public readonly width: number,
    public readonly size: number,
    public status: boolean,
    public title: string,
    public tags: string[],
    public likes: number
  ) {}
}
