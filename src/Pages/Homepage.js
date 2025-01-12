import React, { useState } from 'react';
import Groq from "groq-sdk";
import './Styles/Homepage.css';

function Homepage() {
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([
    { role: "system", content: "" }
  ]);
  const [apiResponse, setApiResponse] = useState('');

  // groq api key - consider moving this to a .env file
  const groqAPI = process.env.REACT_APP_GROQ_API_KEY;

  // Initialize GROQ SDK
  const groq = new Groq({ apiKey: groqAPI, dangerouslyAllowBrowser: true });

  async function getGroqChatCompletion(messages) {
    try {
      console.log("Sending API request with messages:", messages); // Log the request details
      const response = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
      });
      console.log("API Response:", response); // Log the full response
      return response;
    } catch (error) {
      console.error("Error with GROQ API call:", error);
      throw error;
    }
  }

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const fetchData = async () => {
    const newMessages = [
      ...conversationHistory,
      { role: "user", content: userInput }
    ];

    try {
      const response = await getGroqChatCompletion(newMessages);
      console.log(userInput);
      console.log(conversationHistory);
      if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
        const assistantMessage = { role: "assistant", content: response.choices[0].message.content };
        setConversationHistory([...newMessages, assistantMessage]);
        setApiResponse(response.choices[0].message.content);
        console.log(response);
      } else {
        console.log("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setUserInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="conversation">
        <h2>Conversation:</h2>
        {conversationHistory.map((message, index) => (
          <p key={index} className={message.role}>{message.content}</p>
        ))}
      </div>
    </div>
  );
}



export default Homepage;
