import { SearchIcon } from '@heroicons/react/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export const Widgets = () => {
    return (
        <div className='mt-2 px-2 col-span-2 hidden lg:inline'>
            <div className="mt-2 flex items-center space-x-2 bg-gray-100 p-3">
                <SearchIcon className='h-5 w-5 text-gray-400' />
                <input
                    type="text"
                    placeholder='search twitter'
                    className='flex-1 bg-transparent outline-none'
                />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="mina_jp_lisa"
                options={{ height: 1000 }}
            />

        </div>
    )
}
