import React from 'react';
import { ListTodo, MessagesSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

    const location = useLocation();

    return (
        <div className='fixed z-999  top-2 p-4 border bg-[#f3f3f5]  dark:bg-[#1f1f1d] rounded-3xl  right-4  '>
            <div className='flex flex-row gap-4'>
                {
                    location.pathname === "/" ?
                        <Link to={"/chat"}>
                            <MessagesSquare />
                        </Link>
                        :
                        <Link to={"/"}>
                            <ListTodo />
                        </Link>
                }
            </div>
        </div>
    );
}

export default Header;
