import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {
    FormEvent,
    useEffect,
    useState
} from 'react'
import { Comment, Tweet } from '../typings'
import { fetchComments } from '../utils/fetchComments'
import TimeAgo from 'react-timeago'

interface Props {
    tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean[]>(false)
    const [input, setInput] = useState<string>('')
    const { data: session } = useSession()

    console.log('tweet > props > tweet', tweet)

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }
    useEffect(() => {
        refreshComments()
    }, [])
    console.log('Tweet > comments', comments)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    }
    return (
        <div className='flex flex-col space-x-3 border-y border-gray-100 p-5'>
            <div className='flex space-x-3'>
                <img
                    className='h-10 w-10 rounded-full object-cover'
                    src={tweet.profileImg}
                    alt=""
                />

                <div>
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1'>{tweet.username}</p>
                        <p className='hidden text-sm text-gray-500 sm:inline '>@{tweet.username.replace(/\s+/g, '').toLocaleLowerCase()}</p>
                        <TimeAgo
                            className='text-sm text-gray-500 '
                            date={tweet._createdAt}
                        />
                    </div>
                    <p className='pt-1'>{tweet.text}</p>

                    {
                        tweet.image && (
                            <img
                                alt=""
                                className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'
                                src={tweet.image}
                            />
                        )
                    }
                </div>
            </div>

            <div className='mt-5 flex justify-between'>
                <div
                    onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
                    className='flex cursor-pointer items-center space-x-3 text-gray-400'
                >
                    <ChatAlt2Icon
                        className='h-5 w-5'
                    />
                    <p>{comments.length}</p>
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <SwitchHorizontalIcon className='h-5 w-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <HeartIcon className='h-5 w-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <UploadIcon className='h-5 w-5' />
                </div>
            </div>
            {
                commentBoxVisible && (
                    <form
                        className='mt-3 flex space-x-3'
                        onSubmit={handleSubmit}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
                            type="text"
                            placeholder='write a comment here ...'
                        />
                        <button
                            disabled={!input}
                            type='submit'
                            // onClick={e => handleSubmit}
                            className='text-twitter disabled:text-gray-200'>Post</button>
                    </form>
                )
            }

            {/* comment box logic */}
            {
                comments?.length > 0 && (
                    <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                        {
                            comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className='flex space-x-2'
                                >
                                    <hr className=' left-5 top-10 h-8 border-x border-twitter/30' />
                                    <img
                                        className='mt-2 h-7 w-7 rounded-full object-cover'
                                        src={comment.profileImg}
                                    />
                                    <div>
                                        <div className='flex items-center space-x-1'>
                                            <p className='mr-1 font-bold'>{comment.username}</p>
                                            <p className='hidden text-sm lg:inline'>
                                                @{comment.username.replace(/\s+/g, '').toLowerCase()}
                                            </p>
                                            <TimeAgo
                                                className='text-sm text-gray-500'
                                                date={comment._createdAt}
                                            />
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div >
    )
}

export default Tweet
// https://youtu.be/rCselwxbUgA?t=8373