import React from "react";
import {
  hideDialog,
  hideMessenger,
  MessengerChat,
  setMessengerBottomSpacing,
  showDialog,
  showMessenger,
} from "react-messenger-chat-plugin";
const Chatbox = () => {
  return (
    <>
      <div className=""></div>

      <MessengerChat
        pageId="105289585752964"
        language="vi_VN"
        themeColor={"#000000"}
        bottomSpacing={300}
        loggedInGreeting="loggedInGreeting"
        loggedOutGreeting="loggedOutGreeting"
        greetingDialogDisplay={"show"}
        debugMode={true}
      />
    </>
  );
};

export default Chatbox;
