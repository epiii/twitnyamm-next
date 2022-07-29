import { sanityClient } from '../../sanity'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../typings'
import { groq } from 'next-sanity'

const feedQuery = groq`
  *[_type=='tweet' && !blockTweet]{
    _id,
    ...
  }|order(_createdAt desc)
  `

type Data = {
  tweets: Tweet[]
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery)

  // console.log('getTweets > tweets', tweets)
  res.status(200).json({ tweets })
}

export default handler