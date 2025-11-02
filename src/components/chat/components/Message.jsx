import { format } from 'date-fns'

export default function Message({ username, content, isOwn, created_at }) {
    const time = created_at ? format(new Date(created_at), 'hh:mm a') : ''

    return (
        <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`relative text-wrap flex flex-col  px-3 py-2  text-sm shadow-sm rounded-lg max-w-[75%] min-w-[5%] break-words
          ${isOwn
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}
            >
                {!isOwn && (
                    <span className="block text-md font-semibold text-primary opacity-80">
                        {username}
                    </span>
                )}
                <div className="whitespace-pre-wrap">{content}
                    {time && (
                        <span
                            className={`pl-2 text-[10px] opacity-70 `}
                        >
                            {time}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
