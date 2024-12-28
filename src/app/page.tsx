"use client"
import { supabase } from '@/supabaseClient';
import { useEffect, useState } from 'react';


const chats = () => {
  const [data,setData] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('chats').select('*');
      if (error) console.error(error);
      else setData(data);
    };

    fetchData();
  }, []);
  
  

  return (
    <ul>

      {data.map ((item) => (
        <li key={item.id}> {item.chat}</li>
      ))}
    </ul>
  )
}

export default chats