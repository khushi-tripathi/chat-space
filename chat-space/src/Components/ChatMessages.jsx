const ChatMessages = ({ key, message, classs, time, lastMessage }) => {
  return (
    <div className={classs === "left" ? "rcdMsg" : "sentMsg"}>
      {classs === "left" && lastMessage && (
        <div className="newMessage">---------- new message ----------</div>
      )}
      <div className={`messageBox ${classs}`}>{`${message}`}</div>
      <div className={`${classs} time`}>{time}</div>
    </div>
  );
};

export default ChatMessages;
