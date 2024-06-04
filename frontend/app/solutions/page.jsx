"use client"
import { useState, useEffect } from "react";
import { exportingVariable1, getExportingKey , exportingKey } from "../../config";

const Solution = ({ s3key }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const s3Url = exportingVariable1;
  const walletAddress = "0x48e6a467852Fa29710AaaCDB275F85db4Fa420eB";
 
  const mapS3Url = (walletAddress, s3Url) => {
    const data = {
      wallet_address: walletAddress,
      s3url: s3Url,
    };

    fetch("https://echogpt-zvglklnxya-em.a.run.app/mapS3Url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    mapS3Url(walletAddress, s3Url);
  }, [walletAddress, s3Url]);

  const handleSendQuery = async () => {

   
    const Key1 = "JODHPUR_SHADUL_BAIL.docx";
    console.log(Key1);

    setLoading(true);
    const url = "https://echogpt-zvglklnxya-em.a.run.app/chat";

    const payload = { user_query: query, key: Key1 };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json();
      const botResponse = responseData.response;
      const chatHistory = responseData.chat_history;

      // Using callback to ensure the latest state is used
      setMessages((prevMessages) => [...prevMessages, { user: query, bot: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end h-screen">
      <div>
        <img
          src="/Chatbots.jpg"
          alt="chatbot"
          className="w-screen h-screen"
        />
      </div>
      <div className="absolute top-28 right-20 items-center">
        <h1 className="font-bold flex items-center text-3xl text-[#195f4e] mb-10">
          Hey , I am Your Personal Legal Help
        </h1>
        <div className="border-solid border-[#F1AA6C] border-4 rounded-xl p-4 mb-4 w-[70vh] max-h-96 overflow-y-auto bg-transparent font-bold">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <p className="p-1 m-1 rounded-xl text-black border border-[#193A52] bg-[#eedcb7] ">ME: {message.user}</p>
              <p className="p-1 m-1 rounded-xl text-black border border-[#193A52] bg-[#a9cab1]">BOT: {message.bot}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center mb-4 pt-24 text-[#1F5066]">
          <input
            type="text"
            placeholder="Enter your query"
            value={query}
            onChange={handleQueryChange}
            className="border-solid border-[#F1AA6C] border-2 rounded-md p-2 mr-2 flex-grow bg-transparent text-[#1F5066] relative -top-20"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading}
            className="border-solid border-2 border-black rounded-md bg-[#F1AA6C] hover:bg-[#cd905a] text-white relative -top-20 px-8 py-2 shadow-lg ease-in-out duration-500"
          >
            Send
          </button>
        </div>
      </div>
      {error && <div className="absolute top-0 left-0 p-4  text-white">{error}</div>}
    </div>
  );
};

export default Solution;
