import { Text } from 'theme-ui'

type FoldCountProps = {
  count: number
}

export default function FoldCount({ count }: FoldCountProps) {
  return <Text>{`meanwhile.. ${count} folds required`}</Text>
}
