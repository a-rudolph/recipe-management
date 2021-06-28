import { Text } from 'theme-ui'

type FoldCountProps = {
  count: number
}

export default function FoldCount({ count }: FoldCountProps) {
  if (count === 1) return <Text>{`perform ${count} fold`}</Text>

  return <Text>{`perform ${count} folds`}</Text>
}
