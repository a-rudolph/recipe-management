import { Card, Text } from 'theme-ui'
import Link from 'next/link'

type RecipeCardProps = {
  key: string
  name: string
}

export default function RecipeCard({ key, name }: RecipeCardProps) {
  return (
    <Link href={`/${key}`}>
      <Card sx={{ variant: 'card', cursor: 'pointer' }}>
        <Text>{name}</Text>
      </Card>
    </Link>
  )
}
