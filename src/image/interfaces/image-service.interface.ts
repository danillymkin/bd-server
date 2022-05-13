import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';

export const IMAGE_SERVICE = 'IMAGE_SERVICE';

export interface ImageService {
  create(createImageDto: CreateImageDto): Promise<Image>;
}
