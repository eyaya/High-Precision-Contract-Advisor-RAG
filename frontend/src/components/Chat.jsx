import React, { useState } from "react";

import Message from "../components/Message";
import Svg from "../components/Svg";
import aboutImg from "../assets/images/about.png";

function Chat() {
  // this function opens the chat
  function openChart() {
    document.getElementById("assistant-chat").classList.add("show");
    document.getElementById("assistant-chat").classList.remove("hide");
  }

  // this function opens the chat
  function closeChart() {
    document.getElementById("assistant-chat").classList.add("hide");
    document.getElementById("assistant-chat").classList.remove("show");
  }

  function chat_scroll_up() {
    let elem = document.querySelector(".start-chat");
    setTimeout(() => {
      elem.scrollTo({
        top: elem.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  }

  const [chatMessages, setchatMessages] = useState([
    {
      position: "left_bubble",
      message: "Ask me any question about your document? ",
    },
  ]);

  function askAI() {
    var prompt_input = document.getElementById("chat-input");
    var prompt = prompt_input.value;
    console.log(prompt);
    if (prompt.replaceAll(" ", "") === "") {
      return;
    }
    prompt_input.value = "";

    const data = {
      chatHistory: JSON.stringify(chatMessages),
      prompt: prompt,
    };

    fetch("http://127.0.0.1:8080/ask_ai", {
      method: "POST",
      body: JSON.stringify(data), // Convert data to JSON
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        const messages = [
          ...chatMessages,
          {
            position: "right_bubble",
            message: prompt,
          },
          {
            position: "left_bubble",
            message: resData.result,
          },
        ];
        setchatMessages(messages);
        chat_scroll_up()
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div>
      <section id="about" className="py-10 text-white">
        <div className="mt-10">

          <h3 className="text-4xl font-semibold text-justify leading-7 w-11/12 mx-auto">
          High-Precision Legal Expert LLM APP <span className="text-cyan-600">Contract Advisor RAG</span>
          </h3>

          <h3 className="text-2xl font-semibold text-justify leading-7 w-11/12 mx-auto pt-10">
            10 Academy Cohort A weekly challenge: Week 11. 
          </h3>
          <p className="text-justify leading-7 w-11/12 mx-auto">The goal of this challenge is to build, evaluate and improve a RAG system for Contract Q&A, chatting with a contract and asking questions about the contract.
          </p>
          <h3 className="text-2xl font-semibold text-justify leading-7 w-11/12 mx-auto pt-10">
          Business Objective:
          </h3>
          <p className="text-justify leading-7 w-11/12 mx-auto">Developing the next-generation contract AI by leveraging Hybrid LLM technology (edge, private cloud and LLM services), to build the first, fully autonomous, artificial contract lawyer. The first step in our journey is a powerful contract assistant, with the ultimate goal of developing a fully autonomous contract bot, capable of drafting, reviewing, and negotiating contracts, independently, end-to-end, without human assistance.
          </p>
          <h3 className="text-2xl font-semibold text-justify leading-7 w-11/12 mx-auto pt-10">
          Project Methodology:
          </h3>
          <p className="text-justify leading-7 w-11/12 mx-auto">The project consists of the following tasks:</p>
          <ul className="text-justify leading-7 w-11/12 mx-auto">
            <li>Task 1: Research ways to improve RAG systems in general.</li>
            <li>Task 2: Build simple Q&A pipeline with RAG using Langchain</li>
            <li>Task 3: Build a RAG evaluation pipeline with RAGAS</li>
            <li>Task 4: Idea to optimize Contract Q&A</li>
            <li>Task 5: Implement at least two enhancements</li>
            <li>Task 6: Interpretation & Reporting</li>
          </ul>
          
          <div className="flex flex-row-reverse ...">
            <div className="grid grid-cols-1">
              <div>
                <h3 className="text-2xl font-semibold text-justify leading-7 mx-auto pt-10">
                Tech-Stacks Used:
                </h3>
                
                  <ul className="text-justify leading-7  mx-auto">
                    <li><span className="text-cyan-600">Large Language Model:</span> GPT-3, GPT-4,Langchain</li>
                    <li><span className="text-cyan-600">Chunking:</span> RecursiveCharacterTextSplitter</li>
                    <li><span className="text-cyan-600">Vector Store:</span> Chroma</li>
                    <li><span className="text-cyan-600">Retriever:</span> ParentDocumentRetriever and EnsembleRetriever</li>
                    <li><span className="text-cyan-600">Generation and Embedding:</span> OpenAI</li>
                    <li><span className="text-cyan-600">Evaluation:</span> RAGAS</li>
                  </ul>
                
              </div>
            </div>
          </div>
        </div>
        
    </section>
      
      <div>
        <div id="assistant-chat" className="hide ai_chart">
          <div className="header-chat">
            <div className="head-home">
              <div className="info-avatar">
                <Svg />
              </div>
              <p>
                <span className="assistant-name"> Assistant</span>
                <br />
                <small>Online</small>
              </p>
            </div>
          </div>

          <div className="start-chat">
            <div className="assistant-chat-body">
              {chatMessages.map((chatMessage, key) => (
                <Message
                  key={key}
                  position={chatMessage.position}
                  message={chatMessage.message}
                />
              ))}
            </div>
            <div className="blanter-msg">
              <input
                type="text"
                id="chat-input"
                placeholder="What can i help you with..."
                maxLength="400"
              />
              <a
                onClick={askAI}
                
                id="send-it"
                className="send_it"
              >
                <svg viewBox="0 0 448 448">
                  <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z" />
                </svg>
              </a>
            </div>
          </div>
          <a className="close-chat" href="#close" onClick={closeChart}>
            &times;
          </a>
        </div>
        <a
          onClick={openChart}
          className="blantershow-chat"
          
          title="Show Chat"
        >
          <Svg />
          Chat with your legal document
        </a>
      </div>
      
    </div>
  );
}

export default Chat;