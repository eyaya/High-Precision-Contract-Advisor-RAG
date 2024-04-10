# High-Precision-Contract-Advisor-RAG
## Business Need
Lizzy AI is an early-stage Israeli startup focused on developing innovative AI technology for contract management. They are leveraging Hybrid LLM (Legal Language Model) technology to create the first fully autonomous artificial contract lawyer. Initially, their focus is on building a powerful contract assistant with the long-term goal of developing a fully autonomous contract bot capable of handling contract drafting, reviewing, and negotiation independently, without human intervention.

## Goal
The objective of the project is to build, evaluate, and improve a RAG (Retrieve, Answer, Generate) system for Contract Q&A. This system will enable users to interact with contracts, asking questions and receiving relevant answers, effectively creating a conversational interface for contract-related inquiries. Instead of reinventing the wheel, the project will leverage existing frameworks and open-source projects specialized in LLM (Large Language Model) applications, such as Langchain, LlamaIndex, and Azure Rag. By adopting Langchain, a prominent LLM application framework, the focus will be on mastering RAG fundamentals, evaluating the RAG pipeline’s performance, and refining the quality of contract Q&A interactions.
In order to accomplish the goal of this project the first thing we need is to review literatures and trending analysis.

## RAG Pipeline Overview
The essence of Retrieval-Augmented-Generation (RAG) technology lies in the seamless integration of two key AI methodologies: information retrieval and generation. RAG systems elevate the accuracy of language models by dynamically sourcing relevant information from different data sources. This strategy overcome the constraints faced by LLMs dependent solely on pre-existing knowledge. Through coordination of retrieval mechanisms, these models tap into current datasets, empowering them to produce responses that are not just coherent, but also
inspire with contextual depth and factual precision.

## Dependencies
The project requires the following libraries and frameworks:
- Langchain: a leading LLM application framework
- OpenAI API: for embedding and retrieval
- RAGAS: a RAG evaluation framework

## Usage
To run the project, follow the following steps
- Clone the repo: git clone: https://github.com/eyaya/High-Precision-Contract-Advisor-RAG
- Install the dependencies: pip install -r requirements.txt
- To run the backend: cd backend and python3 server.py
- To run the fronted: cd frontend and npm run dev
    


