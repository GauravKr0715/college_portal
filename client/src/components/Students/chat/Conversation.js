import React, { useState, useEffect } from 'react';
import { getFacultySimplifiedData } from '../../../services/student';
import "./conversation.css";

export default function Conversation({ conversation, current_user }) {
  const [user, setUser] = useState(null);

  const getUser = async (friend_id) => {
    try {
      const { data } = await getFacultySimplifiedData(friend_id);
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const friend_id = conversation.members.find(m => m !== current_user.id);
    getUser(friend_id);
  }, []);

  return (
    <div className="conversation">
      {
        user && (
          <>
            <div
              className="conversationImg circle"
            >
              <p>{user.name.split(' ').length >= 2 ? `${user.name.slice(0, 1).toUpperCase()}${user.name.split(' ')[1].slice(0, 1).toUpperCase()}` : user.name.slice(0, 1).toUpperCase()}</p>
            </div>
            <span className="conversationName">{user.name}</span>
          </>
        )
      }
    </div>
  );
}
