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

export const getBakePreDescription = createStepDescriptor`
Remember! 45 minutes prior to baking, start preheating the oven to 475°F. Place the dutch oven on the middle rack to heat up.`

export const getBakeDescription = createStepDescriptor`
Carefully remove the dutch oven (it’s going to be extremely hot). Place the loaf inside and return to the oven.`

export const getBakePostDescription = createStepDescriptor`
Carefully remove the lid and bake for another 15-20 minutes, until you have achieved a deep brown crust.`
