type MetaCallback = (recipe: RecipeType) => string | number

type StepDescriptor = (recipe: RecipeType) => string

const createStepDescriptor = (
  texts: TemplateStringsArray,
  ...args: MetaCallback[]
): StepDescriptor => {
  return (recipe) => {
    let acc = ''

    texts.forEach((text, i) => {
      acc = acc.concat(text)
      if (args[i]) {
        acc = acc.concat(String(args[i](recipe)))
      }
    })

    return acc
  }
}

const getIngredientStringByCategory = (...categories: IngredientCategory[]) => {
  return ({ ingredients }: RecipeType): string => {
    const filtered = ingredients.filter(({ category }) => {
      return categories.includes(category)
    })

    const mapped = filtered.map(getIngredientString)

    return joiner(mapped, getSeperator)
  }
}

export const getAutolysisDescription = createStepDescriptor`
Combine the ${getIngredientStringByCategory(
  'flour',
  'water'
)}. Mix by hand just until incorporated. Cover and let rest.`

const getIngredientString = ({
  quantity,
  name,
  unit,
  extra,
}: IngredientType) => {
  const text = `${quantity} ${unit} of ${name}`

  if (extra) {
    return text.concat(` (${extra})`)
  }

  return text
}

const joiner = <T>(
  arr: T[],
  getSeperator: (index: number, arr: T[]) => string
) => {
  let acc = ''

  arr.forEach((item, i) => {
    acc = acc.concat(String(item)).concat(getSeperator(i, arr))
  })

  return acc
}

const getSeperator = (index: number, arr: string[]) => {
  if (index < arr.length - 2) return ', '
  if (index < arr.length - 1) return ' and '

  return ''
}
