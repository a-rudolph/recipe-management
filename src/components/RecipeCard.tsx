import { Box, Card, Flex, Text } from 'theme-ui'
import EventNoteIcon from '@material-ui/icons/EventNote'
import Link from 'next/link'

type RecipeCardProps = {
  recipe: RecipeType
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { name, key: recipeKey } = recipe

  return (
    <Link href='/recipes/[key]' as={`/recipes/${recipeKey}`}>
      <Card sx={{ variant: 'card', cursor: 'pointer', overflow: 'hidden' }}>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box p={3}>
            <Text>{name}</Text>
          </Box>
          <Link
            sx={{ height: '100%' }}
            href='/recipes/[key]/schedule'
            as={`/recipes/${recipeKey}/schedule`}
          >
            <Flex
              bg='accent'
              p={3}
              sx={{
                width: 'auto',
                maxWidth: '60px',
                transition: 'all .3s ease',
                '@media screen and (min-width: 767px)': {
                  '&:hover': {
                    maxWidth: '180px',
                    '.schedule-text': {
                      opacity: 1,
                    },
                  },
                },
              }}
            >
              <Text color='muted'>
                <EventNoteIcon />
              </Text>
              <Text
                className='schedule-text'
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'inverted',
                  opacity: 0,
                  pl: 1,
                  transition: 'all .2s ease',
                }}
              >
                See schedule
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Card>
    </Link>
  )
}
