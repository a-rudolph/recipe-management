import {
  createStepDescriptor,
  getIngredientStringByCategory,
} from '@utils/description-helpers'

export const getAutolysisDescription = createStepDescriptor`
Combine the ${getIngredientStringByCategory(
  'flour',
  'water'
)}. Mix by hand just until incorporated. Cover and let rest.`

export const getMixDescription = createStepDescriptor`
Sprinkle the ${getIngredientStringByCategory(
  'salt',
  'yeast'
)} over the dough. Incorporate using the pincer method.`

export const getFoldDescription = createStepDescriptor`
The dough requires ${(recipe) => recipe.foldCount} folds during this time.`

export const getShapeDescription = (loafCount: number) => {
  return `Tip the dough onto a floured workstation, divide in ${loafCount} and shape each into a tight ball. Place seam side down into a floured banneton. Cover and let rest.`
}

export const getProofDescription = () => {
  return `Use the finger dent test to know when the loaves are fully proofed.`
}
