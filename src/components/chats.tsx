"use client"


const Chats = ({ data }: { data: any[] }) => {
    return (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.chat}</li>
        ))}
      </ul>
    );
  };
  
export default Chats;
  

