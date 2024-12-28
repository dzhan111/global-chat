"use client"
import Chats from '@/components/chats';
import Input from '@/components/input';
import { supabase } from '@/supabaseClient';
import { useEffect, useState } from 'react';


const page = () => {
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
    <>
    <Chats data={data}/>
    <Input/>
    </>
  )
}

export default page