import { supabase } from '@/supabaseClient';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

const Rating = ({ id }: { id: number }) => {
  const [upvotes, setUpvotes] = useState<number | null>(null);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null); // Tracks the user's vote

  // Fetch the current upvotes when the component mounts
  const fetchUpvotes = async () => {
    const { data, error } = await supabase
      .from('chats')
      .select('upvotes')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching upvotes:', error.message);
    } else {
      setUpvotes(data?.upvotes || 0); // Update state with fetched upvotes
    }
  };

  // Handle Upvote
  const handleUpvote = async () => {
    if (userVote === 'upvote') {
      // Undo upvote
      const { error } = await supabase
        .from('chats')
        .update({ upvotes: (upvotes || 0) - 1 })
        .eq('id', id);

      if (error) {
        console.error('Error undoing upvote:', error.message);
      } else {
        setUpvotes((prev) => (prev || 0) - 1);
        setUserVote(null); // Reset vote
      }
    } else {
      // Apply upvote
      const adjustment = userVote === 'downvote' ? 2 : 1; // Reverse downvote and apply upvote
      const { error } = await supabase
        .from('chats')
        .update({ upvotes: (upvotes || 0) + adjustment })
        .eq('id', id);

      if (error) {
        console.error('Error upvoting:', error.message);
      } else {
        setUpvotes((prev) => (prev || 0) + adjustment);
        setUserVote('upvote'); // Mark as upvoted
      }
    }
  };

  // Handle Downvote
  const handleDownvote = async () => {
    if (userVote === 'downvote') {
      // Undo downvote
      const { error } = await supabase
        .from('chats')
        .update({ upvotes: (upvotes || 0) + 1 })
        .eq('id', id);

      if (error) {
        console.error('Error undoing downvote:', error.message);
      } else {
        setUpvotes((prev) => (prev || 0) + 1);
        setUserVote(null); // Reset vote
      }
    } else {
      // Apply downvote
      const adjustment = userVote === 'upvote' ? -2 : -1; // Reverse upvote and apply downvote
      const { error } = await supabase
        .from('chats')
        .update({ upvotes: (upvotes || 0) + adjustment })
        .eq('id', id);

      if (error) {
        console.error('Error downvoting:', error.message);
      } else {
        setUpvotes((prev) => (prev || 0) + adjustment);
        setUserVote('downvote'); // Mark as downvoted
      }
    }
  };

  useEffect(() => {
    fetchUpvotes();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <button
        className={`text-lg ${userVote === 'upvote' ? 'text-green-500' : ''}`}
        onClick={handleUpvote}
      >
        <FaArrowAltCircleUp />
      </button>
      <span>{upvotes}</span>
      <button
        className={`text-lg ${userVote === 'downvote' ? 'text-red-500' : ''}`}
        onClick={handleDownvote}
      >
        <FaArrowAltCircleDown />
      </button>
    </div>
  );
};

export default Rating;
