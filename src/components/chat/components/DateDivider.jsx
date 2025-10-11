import { format, isToday, isYesterday } from 'date-fns'

export default function DateDivider({ date }) {
    let label = format(date, 'MMM d, yyyy')
    if (isToday(date)) label = 'Today'
    else if (isYesterday(date)) label = 'Yesterday'

    return (
        <div className="flex items-center justify-center my-3">
            <div className="w-full h-px bg-border" />
            <span className="mx-3 text-xs text-nowrap text-muted-foreground">{label}</span>
            <div className="w-full h-px bg-border" />
        </div>
    )
}
