import React from "react";

const TodoDescription = ({ description }) => {
  return (
    <div className='ml-2 mt-2 p-2 w-[98%] px-4 rounded-[var(--radius)] bg-popover text-sidebar-foreground border text-sm'>
      {description ? <p>{description}</p> : <p>No description found</p>}
    </div>
  );
};

export default TodoDescription;

