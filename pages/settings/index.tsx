import dynamic from 'next/dynamic'

const UserSettings = dynamic(() => import('@/components/UserSettings'), {
  ssr: false,
})

const Page: React.FC = () => {
  return <UserSettings />
}

export default Page
