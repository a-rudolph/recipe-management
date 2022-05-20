import { formatNumber } from './formatNumber'

type MetaCallback = (recipe: RecipeType) => string | number

type StepDescriptor = (recipe: RecipeType) => string

export const createStepDescriptor = (
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

export const getIngredientStringByCategory = (
  ...categories: IngredientCategory[]
) => {
  return ({ ingredients }: RecipeType): string => {
    const filtered = ingredients.filter(({ category }) => {
      return categories.includes(category)
    })

    const mapped = filtered.map(getIngredientString)

    return joiner(mapped, getSeperator)
  }
}

export const getIngredientString = ({
  quantity,
  name,
  unit,
  extra,
}: IngredientType) => {
  const text = `${formatNumber(quantity)} ${unit} of ${name}`

  if (extra) {
    return text.concat(` (${extra})`)
  }

  return text
}

export const joiner = <T>(
  arr: T[],
  getSeperator: (index: number, arr: T[]) => string
) => {
  let acc = ''

  arr.forEach((item, i) => {
    acc = acc.concat(String(item)).concat(getSeperator(i, arr))
  })

  return acc
}

export const getSeperator = (index: number, arr: string[]) => {
  if (index < arr.length - 2) return ', '
  if (index < arr.length - 1) return ' and '

  return ''
}
