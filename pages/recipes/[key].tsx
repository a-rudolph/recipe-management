import { GetStaticPaths, GetStaticProps } from 'next'
import DetailedTimeline from '@components/DetailedTimeline'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import RecipeDetail from '@components/RecipeDetail'
import BasicLayout from '@layouts/BasicLayout'
import { useRef, useState } from 'react'
import { CarouselRef } from 'antd/lib/carousel'
import { Carousel } from 'antd'

type Views = 'main' | 'time'

const Page = ({ recipe }: { recipe: RecipeType }) => {
  const [view, setView] = useState<Views>('main')

  const carouselRef = useRef<CarouselRef>(null)

  const goTo = (slide: number) => {
    if (!carouselRef.current) return

    carouselRef.current.goTo(slide)
  }

  const changeView = () => {
    setView((prev) => {
      if (prev === 'main') {
        goTo(1)
        return 'time'
      }
      goTo(0)
      return 'main'
    })
  }

  return (
    <BasicLayout.Card side='right'>
      <Carousel
        beforeChange={(currentSlide) => {
          if (currentSlide === 1) {
            setView('main')
            return
          }

          setView('time')
        }}
        ref={carouselRef}
        dots={false}
      >
        <RecipeDetail recipe={recipe} onClock={changeView} />
        <DetailedTimeline recipe={recipe} onBack={changeView} />
      </Carousel>
    </BasicLayout.Card>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    ...getRecipePaths(),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    ...getRecipeProps(params),
  }
}

export default Page
