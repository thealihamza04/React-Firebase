import React from 'react';
import { ListTodo, MessagesSquare } from "lucide-react"
import { Button } from "@/components/animate-ui/components/buttons/button.tsx"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AnimateIcon } from "@/components/ui/animate-ui/icons/icon.tsx"
import { MessageSquareText } from "@/components/ui/animate-ui/icons/message-square-text.tsx"
import { ClipboardList } from "@/components/animate-ui/icons/clipboard-list.tsx"
import { List } from "@/components/ui/animate-ui/icons/list.tsx"


const Header = () => {

    const location = useLocation();

    return (
        <AnimateIcon animateOnHover>
            <div className="fixed top-4 right-4 md:right-6 z-10">
                <Link to={location.pathname === "/" ? "/chat" : "/"}>
                    <Button variant="outline" size="xl" className="p-3 cursor-pointer">
                        {location.pathname === "/" ? <MessageSquareText /> : <List animation="path-loop" />}
                    </Button>
                </Link>
            </div>
        </AnimateIcon>
    );

}

export default Header;

