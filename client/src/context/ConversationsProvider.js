import React, { useContext } from "react";

const ConversationContext = React.createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = React.useState([]);

  function createConversation(recipients) {
    setConversations((prevConversation) => {
      return [...prevConversation, { recipients, messages: [] }];
    });
  }

  return (
    <ConversationContext.Provider value={{ conversations, createConversation }}>
      {children}
    </ConversationContext.Provider>
  );
}
