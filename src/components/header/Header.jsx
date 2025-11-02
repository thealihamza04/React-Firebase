import React from 'react';
import { ListTodo, MessagesSquare } from "lucide-react"
import { Button } from "@/components/animate-ui/components/buttons/button.tsx"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AnimateIcon } from "@/components/ui/animate-ui/icons/icon.tsx"
import { MessageSquareText } from "@/components/ui/animate-ui/icons/message-square-text.tsx"
import { List } from "@/components/ui/animate-ui/icons/list.tsx"

const Header = () => {

    const location = useLocation();

    return (
        <AnimateIcon animateOnHover >
            <div className='fixed z-1  top-2 p-4 border bg-secondary   rounded-3xl  right-4 '>
                <div className='flex flex-row gap-4'>
                    {
                        location.pathname === "/" ?
                            <Link to={"/chat"}>
                                <MessageSquareText />
                            </Link>
                            :
                            <Link to={"/"}>
                                <List />
                            </Link>
                    }
                </div>
            </div>
        </AnimateIcon>
    );
}

export default Header;

