import { Loader2 } from 'lucide-react'

export default function Loader({ size = 20 }) {
    return <Loader2 className="animate-spin text-muted-foreground" size={size} />
}
