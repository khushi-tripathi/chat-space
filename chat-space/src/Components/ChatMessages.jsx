const ChatMessages = ({ key, message, classs, time, lastMessage, item, userDetails }) => {
  const getName = (email) => {
    const user = userDetails?.filter((item) => item.email === email)
    if (user?.length)
      return user[0].first_name + ' ' + user[0].last_name
    else
      return ''
  }
  return (
    <div className={classs === "left" ? "rcdMsg" : "sentMsg"}>
      {classs === "left" && lastMessage && (
        <div className="newMessage">---------- new message ----------</div>
      )}
      <div className={`messageBox ${classs}`}>
        <div className={''}>{getName(item?.email)}</div>
        {classs === "left" ? (<br />) : null}
        {`${message}`}
      </div>
      <div className={`${classs} time`}>{time}</div>
    </div>
  );
};

export default ChatMessages;
