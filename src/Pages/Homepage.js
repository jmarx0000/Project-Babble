import React, { useState, useEffect, useRef } from 'react';
import Groq from "groq-sdk";
import './Styles/Homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Homepage() {
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([
    { role: "system", content: "" }
  ]);
  const [apiResponse, setApiResponse] = useState('');
  const conversationEndRef = useRef(null);

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

    setConversationHistory(newMessages);

    try {
      const response = await getGroqChatCompletion(newMessages);
      console.log(userInput);
      console.log(conversationHistory);
      if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
        const assistantMessage = { role: "assistant", content: response.choices[0].message.content };
        
        // timeout to make it feel more like another person is responding
        setTimeout(() => {
          // Use functional form of setState to ensure you are working with the latest state
          setConversationHistory(prevHistory => [...prevHistory, assistantMessage]);
        }, 500);

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

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div className="conversation">
        <h2>Conversation:</h2>
        {conversationHistory.slice(1).map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'model-message'}`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      <div ref={conversationEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}



export default Homepage;
