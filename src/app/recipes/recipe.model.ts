import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  constructor(public name = '', public description = '', public imagePath = '',
              public ingredients?: Ingredient[]) {

  }
}
