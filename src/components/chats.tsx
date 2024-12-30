"use client"

import Rating from "./Rating";



const Chats = ({ data }: { data: any[] }) => {
    return (
        <ul className="list-none space-y-4">
            {data.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                    <span>{item.chat}</span>
                    <Rating id={item.id}/>
                </li>
            ))}
        </ul>
    );
};

export default Chats;


