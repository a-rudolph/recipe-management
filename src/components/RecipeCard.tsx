import { Card, Text } from 'theme-ui'
import Link from 'next/link'

type RecipeCardProps = {
  recipeKey: string
  name: string
}

export default function RecipeCard({ recipeKey, name }: RecipeCardProps) {
  return (
    <Link href='/recipes/[key]' as={`/recipes/${recipeKey}`}>
      <Card sx={{ variant: 'card', cursor: 'pointer' }}>
        <Text>{name}</Text>
      </Card>
    </Link>
  )
}
