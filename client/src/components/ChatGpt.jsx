import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useThemeContext } from "../context/ThemeContext";
import { useAppContext } from "../context/AppContext";

const OPEN_API_SECRET_KEY = import.meta.env.VITE_OPEN_API_SECRET_KEY;

const ChatGpt = () => {
  const { user } = useAppContext();
  const { isDarkMode } = useThemeContext();
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "I am your friend! Ask me anything?",
      sender: "Athena",
      direction: "outgoing",
      avatar: "./athena.svg",
      date: new Date(),
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: user?.firstName,
      direction: "incoming",
      avatar: user?.image?.url || "https://placehold.co/60x60/png",
      date: new Date(),
    };

    const newMessages = [...messages, newMessage]; // add the old messages plus the new message

    // update our messages state

    setMessages(newMessages);

    // set a typing indicator (chatGPT is typing...)
    setTyping(!typing);

    // process message to chatGPT ( send it over and see the response)

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages {sender:"user" or "chatGPT", message: "the content of the message"}
    // apiMessages {role: "user" or "assistant", content: "the message content"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Athena") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });

    // role: "user" -> a message from the user, "assistant" -> a message from chatGPT
    // "system" -> generally one initial message defining how we want chatGpt to behave and talk

    const systemMessage = {
      role: "system",
      content:
        "Explain all concepts like I am 10 years old and speak like a human",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1, message2, message3]
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_API_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.choices?.length) {
          setMessages((prevState) => [
            ...prevState,
            {
              message: data.choices[0].message?.content,
              sender: "Athena",
              direction: "outgoing",
              avatar: "./athena.svg",
              date: new Date(),
            },
          ]);
        }
        setTyping(typing);
      });
  }

  return (
    <MainContainer
      className={`${
        isDarkMode ? "dark" : "light"
      } flex flex-col rounded-2xl shadow-md border-none`}
    >
      <h3 className=" text-center text-xl font-semibold py-3">
        Hello, I am Athena
      </h3>
      <ChatContainer className="rounded-2xl">
        <MessageList
          className={`${
            isDarkMode ? "dark dark-border" : "light light-border"
          } h-80 px-3 pt-2 border-t`}
          scrollBehavior="smooth"
          typingIndicator={
            typing ? (
              <TypingIndicator
                className={isDarkMode ? "dark" : "light"}
                content="Alex is typing..."
              />
            ) : null
          }
        >
          <MessageSeparator
            className={isDarkMode ? "dark" : "light"}
            content="Today"
          />

          {messages.map((message, i) => (
            <Message
              key={i}
              model={{
                message: message.message,
                sender: message.sender,
                sentTime: message.date?.toString(),
                direction: message.direction,
              }}
            >
              <Avatar src={message.avatar} name={message.sender} />
              
            </Message>
          ))}
        </MessageList>
        <MessageInput
          className={isDarkMode ? "dark dark-border" : "light light-border"}
          attachButton={false}
          placeholder="Type message here"
          onSend={(message) => handleSend(message)}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatGpt;
