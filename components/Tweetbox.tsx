import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useRef,
    useState
} from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function Tweetbox({ setTweets }: Props) {
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

    const { data: session } = useSession()
    const imageInputRef = useRef<HTMLInputElement>(null)

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'unknown User',
            profileImg: session?.user?.image || 'https://links.papareact/gll',
            image: image
        }
        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })
        const json = await result.json()
        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon: '🚀'
        })
        return json
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        postTweet()
        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    return (
        <div className='flex space-x-2 p-5'>
            <img
                className='mt-4 h-14 w-14 rounded-full object-cover'
                src={session?.user?.image || "https://links.papareact.com/gll"}
                alt=""
            />
            <div className='flex flex-1 pl-2 items-center'>
                <form className='flex flex-1 flex-col'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='h-24 w-full text-xl outline-none placeholder:text-xl'
                        type="text"
                        placeholder="what's happening ?"
                    />
                    <div className='flex items-center'>
                        <div className='flex flex-1 space-x-2 text-twitter'>
                            <PhotographIcon
                                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                                className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                            />
                            <SearchCircleIcon className='h-5 w-5' />
                            <EmojiHappyIcon className='h-5 w-5' />
                            <CalendarIcon className='h-5 w-5' />
                            <LocationMarkerIcon className='h-5 w-5' />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!input || !session}
                            className='rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40'
                        >
                            Tweet
                        </button>
                    </div>
                    {imageUrlBoxIsOpen && (
                        <form className='rounded-lg mt-5 flex bg-twitter/80 py-2 px-4 '>
                            <input
                                ref={imageInputRef}
                                className='flex-1 bg-transparent text-white outline-none placeholder:text-white'
                                type="text"
                                placeholder='Enter Image URL ..'
                            />
                            <button
                                type='submit'
                                onClick={addImageToTweet}
                                className='font-bold text-white'>Add Image</button>
                        </form>
                    )}

                    {image && (
                        <img
                            className='mt-10 h-40 w-full object-contain rounded-xl shadow-lg'
                            src={image}
                            alt="" />
                    )}

                </form>
            </div>
        </div>
    )
}

export default Tweetbox