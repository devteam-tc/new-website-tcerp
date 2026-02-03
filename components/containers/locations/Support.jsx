'use client';

import { useState, useEffect } from 'react';

const randomUsers = [
  { name: 'Jordan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
  { name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { name: 'Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { name: 'Emma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { name: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
];

export default function Support() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [supportAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Andry');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Randomly select 2-3 users for the chat
      const shuffled = [...randomUsers].sort(() => 0.5 - Math.random());
      setUsers(shuffled.slice(0, Math.floor(Math.random() * 2) + 2));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="support-section">
      <div className="chat-box">
        <div className="chat-window">
          <div className="chat-header">
            <img src={supportAvatar} alt="priya" />
            <div>
              <div className="name">Priya</div>
              <div className="status">Typically replies in a few minutes</div>
            </div>
          </div>
          <div className="chat-body">
            {isLoading ? (
              <>
                <div className="message shimmer">
                  <div className="shimmer-avatar"></div>
                  <div className="shimmer-text"></div>
                </div>
                <div className="message shimmer">
                  <div className="shimmer-avatar"></div>
                  <div className="shimmer-text"></div>
                </div>
                <div className="message shimmer">
                  <div className="shimmer-avatar"></div>
                  <div className="shimmer-text"></div>
                </div>
              </>
            ) : (
              <>
                {users.map((user, index) => (
                  <div key={index} className={`message ${index % 2 === 0 ? 'reply' : ''}`}>
                    <div className="user-info">
                      <img src={user.avatar} alt={user.name} />
                      <div className="user-name">{user.name}</div>
                    </div>
                    <div className="text">
                      {index % 2 === 0 
                        ? "Hey, Thanks for visiting. If you have any questions, I'm here to help! 😊"
                        : "Hey dude, happy to meet you man we are excited with our design"}
                    </div>
                  </div>
                ))}
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </>
            )}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              className="message-input"
              disabled
              value=""
            />
            <div className="send-button-static">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="support-text">
        <h2 className='section-title title-anim undefined'>
          Customer support is our first priority.
        </h2>
        <p>
          Get your tests delivered at let home collect sample from the victory of the
          managements that supplies best design system guidelines ever.
        </p>
        <ul>
          <li>Medical and vision</li>
          <li>Life insurance</li>
          <li>HSAs and FSAs</li>
          <li>Commuter benefits</li>
        </ul>
      </div>
    </section>
  );
}

