import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label.tsx";
import { Button } from '@/components/animate-ui/components/buttons/button.tsx'

export default function UsernameModal({ onSetUsername, open, onOpenChange }) {
    const [name, setName] = useState('')

    function handleSubmit() {
        if (!name.trim()) return
        onSetUsername(name.trim())
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} defaultOpen={open === undefined}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter a unique username</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mt-4 items-end">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your name"
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                    <Button onClick={handleSubmit}>Join</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
