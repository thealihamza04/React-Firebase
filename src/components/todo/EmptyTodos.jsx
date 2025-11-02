import {
    ClipboardList,
    PartyPopper,
    Hourglass,
    Bubbles,
    CircleGauge,
} from "lucide-react";

const EmptyTodos = ({ type }) => {
    return (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
            {type === "noTodos" && (
                <>
                    <Bubbles
                        size={48}
                        className='text-muted-foreground mb-4 animate-[bounce_4s_linear_infinite]'
                    />
                    <h2 className='text-lg font-semibold'>No todos yet</h2>
                    <p className='text-sm text-muted-foreground'>
                        Start by creating your first todo
                    </p>
                </>
            )}

            {type === "noPending" && (
                <>
                    <PartyPopper
                        size={48}
                        className='text-muted-foreground mb-4 animate-[pulse_6s_linear_infinite]'
                    />
                    <h2 className='text-lg font-semibold'>All done </h2>
                    <p className='text-sm text-muted-foreground max-w-[80%]'>
                        You’ve completed all your pending tasks. Take a break!
                    </p>
                </>
            )}

            {type === "noCompleted" && (
                <>
                    <CircleGauge
                        size={48}
                        className='text-muted-foreground mb-4 animate-[spin_9s_linear_infinite]'
                    />
                    <h2 className='text-lg font-semibold'>
                        No tasks completed yet
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        Start finishing your tasks to track progress
                    </p>
                </>
            )}
        </div>
    );
};

export default EmptyTodos;
