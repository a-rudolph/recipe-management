import { Button } from 'antd'
import Link from 'next/link'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Text } from '@components/atoms'
import { useTimerContext } from '@hooks/useTimerContext'

const StartRecipeButton: React.FC<{
  recipeKey: string
  fullButton?: boolean
}> = ({ recipeKey, fullButton = false }) => {
  const { setKeyRecipe } = useTimerContext()

  const onClick = () => {
    setKeyRecipe({ key: recipeKey })
  }

  return (
    <Link href='/baking' as={`/baking?recipeKey=${recipeKey}`}>
      {fullButton ? (
        <Button onClick={onClick} icon={<PlayCircleOutlined />}>
          Start Recipe
        </Button>
      ) : (
        <Button
          onClick={onClick}
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
