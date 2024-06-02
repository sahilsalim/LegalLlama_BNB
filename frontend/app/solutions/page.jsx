"use client";
import { useState } from "react";
import cors from "cors";
const Solution = ({ s3Key }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSendQuery = async () => {
    setLoading(true);
    let Key = "exportingVariable";
    const url = "https://echogpt-zvglklnxya-em.a.run.app/chat";
    const payload = { user_query: query, key: Key };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log("Response Status Code:", res.status);

      const botResponse = responseData.response;
      const chatHistory = responseData.chat_history;

      setMessages([...messages, { user: query, bot: botResponse }]);
      // If you want to include chat history, you can update the state accordingly
      // setMessages([...messages, ...chatHistory]);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }

    setQuery("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end  h-screen">
      <div>
        <img
          src="/Chatbots.jpg"
          alt="chatbot"
          className="w-screen h-screen  "
        />
      </div>
      <div className="absolute top-32 right-20 items-center">
        <h1 className="font-bold flex items-center text-3xl text-[#195f4e] mb-10">
          Hey , I am Your Personal Legal Help
        </h1>
        <div className="border-solid border-[#F1AA6C] border-4 rounded-xl p-40 mb-4 w-full max-h-96 overflow-y-auto bg-transparent ">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <p className="p-2">User: {message.user}</p>
              <p className="p-2">Bot: {message.bot}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center mb-4 pt-24 text-[#1F5066]">
          <input
            type="text"
            placeholder="Enter your query"
            value={query}
            onChange={handleQueryChange}
            className="border-solid border-[#F1AA6C] border-2 rounded-md p-2  mr-2 flex-grow bg-transparent text-[#1F5066] relative -top-20"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading}
            className="border-solid border-2 border-[#F1AA6C] rounded-md  bg-[#F1AA6C] hover:bg-[#cd905a] text-white relative -top-20 px-8 py-2 shadow-lg ease-in-out duration-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solution;
