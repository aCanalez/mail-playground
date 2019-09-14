import React, { useState } from "react";
import "./App.css";

//Create Message Display Component
function MessageHolder({ message, index, deleteMessage, readMessage }) {
  return (
    <div
      key={index}
      style={{ marginTop: "2rem", fontStyle: message.isRead ? "italic" : "" }}
    >
      <span>
        <strong>From:</strong> {message.email}
      </span>
      <br />
      <span>{message.date}</span> <span>{message.message}</span>
      <br />
      <button onClick={() => deleteMessage(index)}>Delete</button>
      <button onClick={() => readMessage(index)}>Mark as read</button>
    </div>
  );
}

//Create Input Form Component
function Form({ addMessage }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!message || !email) return;
    addMessage({ message, email });
    setMessage("");
    setEmail("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email Address:</label>
        <br />
        <input onChange={e => setEmail(e.target.value)} value={email} />
        <br />
        <label>Message:</label>
        <br />
        <textarea onChange={e => setMessage(e.target.value)} value={message} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function App() {
  //Declare array that holds messages
  const [messages, setMessages] = useState([]);

  const addMessage = text => {
    const d = new Date();
    const date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    const newMessages = [
      ...messages,
      { message: text.message, email: text.email, date: date, isRead: false }
    ];
    setMessages(newMessages);
  };

  const deleteMessage = index => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const readMessage = index => {
    const newMessages = [...messages];
    newMessages[index].isRead = true;
    setMessages(newMessages);
  };

  var count = messages.reduce((acc, cur) => cur.isRead === false ? ++acc : acc, 0);
  const messageCount = messages.length;

  return (
    <div>
      <h3>Send a message</h3>
      <Form addMessage={addMessage} />

      <h3>Messages ({messageCount}), Unread ({count})</h3>
      {messages.map((message, index) => (
        <>
          <MessageHolder
            message={message}
            key={index}
            index={index}
            deleteMessage={deleteMessage}
            readMessage={readMessage}
          />
        </>
      ))}
    </div>
  );
}

export default App;
