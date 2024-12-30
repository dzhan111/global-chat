"use client"
import Chats from '@/components/Chats';
import Input from '@/components/Input';
import { supabase } from '@/supabaseClient';
import { useEffect, useState } from 'react';


const page = () => {
  const [data, setData] = useState<any[]>([])
  const fetchData = async () => {
    const { data, error } = await supabase.from('chats').select('*');
    if (error) console.error(error);
    else setData(data);
  };

  useEffect(() => {

    fetchData();

  }, []);


  return (
    <div>
      <Chats data={data} />
      <Input onChatSubmitted={fetchData} />
    </div>
  )
}

export default page