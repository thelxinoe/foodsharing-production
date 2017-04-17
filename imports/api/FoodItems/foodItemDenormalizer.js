import { ImageItems } from '../ImageItems/ImageItems';

const foodItemDenormalizer = {
  afterInsertFoodItem(_id){
    ImageItems.update({_id:_id}, {$inc, {totalItems:1}})
  }
}
