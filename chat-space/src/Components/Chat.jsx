import { useRef } from "react";
import { socketEmit } from "./socket";

const Chat = () => {
  const inputRef = useRef();
  return (
    <>
      <input ref={inputRef} />
      <button
        onClick={() => socketEmit("chat", { message: inputRef.current.value })}
      >
        Chat
      </button>
    </>
  );
};

export default Chat;
