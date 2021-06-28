import { Text } from 'theme-ui'

type FoldCountProps = {
  count: number
}

export default function FoldCount({ count }: FoldCountProps) {
  if (count === 1) return <Text>{`${count} fold required`}</Text>

  return <Text>{`${count} folds required`}</Text>
}
