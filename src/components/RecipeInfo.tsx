/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui'

type RecipeTimesProps = {
  times: RecipeType['times']
}

export default function RecipeTimes(props: RecipeTimesProps) {
  const { times } = props

  const timeStyles = {
    color: 'accent',
    fontWeight: 500,
    padding: '0 8px',
  }

  return (
    <Flex>
      <Flex>
        Bulk fermentation time:
        <Text sx={timeStyles}>{times.bulk.join('-')} hours</Text>
      </Flex>
      <Flex>
        Proof time:
        <Text sx={timeStyles}>{times.proof.join('-')} hours</Text>
      </Flex>
    </Flex>
  )
}
