import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

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

const OPEN_API_SECRET_KEY = import.meta.env.VITE_OPEN_API_SECRET_KEY;

const ChatGpt = () => {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "I am your friend! Ask me anything?",
      sender: "ChatGPT",
      direction: "incoming",
      avatar: "https://i.imgur.com/7k12EPD.png",
      date: new Date(),
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
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
      if (messageObject.sender === "ChatGPT") {
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
              sender: "ChatGPT",
              direction: "outgoing",
              avatar: "https://i.imgur.com/7k12EPD.png",
              date: new Date(),
            },
          ]);
        }
        setTyping(typing);
      });
  }

  //   const handleSend = async (newMessage) => {
  //     const response = await fetch("/api/chatbot", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: newMessage }),
  //     });

  //     const data = await response.json();

  //     setMessages((prevState) => [
  //       ...prevState,
  //       {
  //         message: data.message,
  //         sender: "ChatGPT",
  //         direction: "outgoing",
  //         avatar: "https://i.imgur.com/7k12EPD.png",
  //         date: new Date(2021, 0, 1, 9, 0),
  //       },
  //     ]);

  return (
    <MainContainer className="flex flex-col bg-neutral-800 rounded-2xl border-neutral-800">
      <h3 className=" text-center text-white text-xl font-semibold p-5">
        Hello, I am Alex
      </h3>
      <ChatContainer className="bg-neutral-800 rounded-2xl">
        <MessageList
          className="bg-neutral-800 h-80 w-80 rounded-lg px-3 pt-2 border-t border-neutral-700"
          scrollBehavior="smooth"
          typingIndicator={
            typing ? <TypingIndicator content="Alex is typing..." /> : null
          }
        >
          {/* <Avatar src="https://i.imgur.com/7k12EPD.png" name="ChatGPT" /> */}

          <MessageSeparator
            className="bg-neutral-800 text-neutral-100 "
            content="Today"
          />

          {messages.map((message, i) => {
            return (
              <Message
                key={i}
                model={{
                  message: message.message,
                  sentTime: message.date?.toString(),
                }}
                sender={message.sender}
                direction={message.direction}
                avatar={message.avatar}
              />
            );
          })}
        </MessageList>
        <MessageInput
          attachButton={false}
          placeholder="Type message here"
          onSend={(message) => handleSend(message)}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatGpt;
