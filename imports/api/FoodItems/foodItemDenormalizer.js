import { ImageItems } from '../ImageItems/ImageItems';

export const foodItemDenormalizer = {
  afterInsertFoodItem(_id){
    ImageItems.update({_id:_id}, {$inc: {totalItems:1}})
  }
}
