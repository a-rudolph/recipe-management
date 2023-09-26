import {
  createStepDescriptor,
  getIngredientStringByCategory,
} from '@/utils/description-helpers'

export const getAutolysisDescription = createStepDescriptor`
Combine the <b>${getIngredientStringByCategory(
  'flour',
  'water'
)}</b>. Mix by hand until incorporated. Cover and let&nbsp;rest.`

export const getMixDescription = createStepDescriptor`
Sprinkle the <b>${getIngredientStringByCategory(
  'salt',
  'yeast'
)}</b> over the dough. Incorporate using the pincer&nbsp;method.`

export const getFoldDescription = createStepDescriptor`
The dough <b>requires ${(recipe) =>
  recipe.foldCount} folds</b> during this&nbsp;time.`

export const getShapeDescription = (loafCount: number) => {
  return `Tip the dough onto a floured workstation, <b>divide in ${loafCount} and shape each into a tight ball</b>. Place seam side down into a floured banneton. Cover and let&nbsp;rest.`
}

export const getProofDescription = () => {
  return `Use the finger dent test to know when the loaves are fully&nbsp;proofed.`
}

export const getBakePreDescription = createStepDescriptor`
Remember! Start <b>preheating the oven to 475°F, 45 minutes</b> prior to baking. Place the dutch oven on the middle rack to heat&nbsp;up.`

export const getBakeDescription = createStepDescriptor`
Carefully remove the dutch oven. Place the loaf inside, cover it and return to the oven. <b>Bake for 30 minutes with the lid&nbsp;on</b>`

export const getBakePostDescription = createStepDescriptor`
Remove the lid and <b>bake for another 15-20 minutes</b>, until you have achieved a deep brown&nbsp;crust.`
