import React from "react";

const TodoDescription = ({ description }) => {
  return (
    <div className='mt-3 w-full rounded-md border border-muted bg-muted/20 p-3 text-sm leading-relaxed'>
      {description ? (
        <p className='text-muted-foreground'>{description}</p>
      ) : (
        <p className='italic text-muted-foreground'>No description provided</p>
      )}
    </div>
  );
};

export default TodoDescription;
