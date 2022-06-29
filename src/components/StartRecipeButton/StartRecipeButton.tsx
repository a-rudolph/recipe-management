import { Button } from 'antd'
import Link from 'next/link'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Text } from '@components/atoms'

const StartRecipeButton: React.FC<{
  recipeKey: string
  fullButton?: boolean
}> = ({ recipeKey, fullButton = false }) => {
  return (
    <Link href='/baking' as={`/baking?recipeKey=${recipeKey}`}>
      {fullButton ? (
        <Button icon={<PlayCircleOutlined />}>Start Recipe</Button>
      ) : (
        <Button
          type='text'
          icon={
            <Text color='wheaty_1'>
              <PlayCircleOutlined style={{ fontSize: '24px' }} />
            </Text>
          }
        />
      )}
    </Link>
  )
}

export default StartRecipeButton
