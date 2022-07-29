import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { Widgets } from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home: NextPage = ({ tweets }: Props) => {
  console.log('index > tweets', tweets)

  return (
    <div
      className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden"
    >
      <Head>
        <title>TwittNyamm</title>
      </Head>
      <Toaster />

      <main className='grid grid-cols-9'>
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>

    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  console.log('index > getserver > tweets', tweets)

  return {
    props: {
      tweets,
    }
  }
}