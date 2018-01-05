import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  constructor(public id?: number, public name = '', public description = '', public imagePath = '',
              public ingredientes?: Ingredient[]) {

  }
}
