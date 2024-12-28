"use client"
import { supabase } from '@/supabaseClient';
import { useState } from 'react';


const Input = () => {

    
  
    const [chat, setChat] = useState("");

    const sendChat = async () => {
        const { data, error } = await supabase.from('chats').insert([{ chat }]);
        if (error) {
        console.error('Error adding chat:', error.message);
        } else {
        setChat(''); // Clear input field
    
        }
    };

      
    
  return (
    <>
    <input
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        placeholder="Type your chat"
        className='px-4, py rounded-lg text-black'
      />
    <button onClick={(e:any) => sendChat()} className="bg-slate-300 text-black px-4 py-2 rounded">Button</button>
    </>
  )
}

export default Input