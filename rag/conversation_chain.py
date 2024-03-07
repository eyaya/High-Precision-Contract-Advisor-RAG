from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

class ConversationChain:
    def create_retrieval_qa_chain(self, chat_model, retriever):
        """Creates a retrieval QA chain combining model and database."""
        system_template = """You are a legal expert tasked with acting as the best lawyer and contract analyzer. Your task is to thoroughly understand the provided context and answer questions related to legal matters, contracts, and relevant laws. If the necessary information is not present in the context use the given context, then get related contexts and answer the question. If the question cannot be answered, respond with "I don't know.".
        If the question can be answered as either yes or no, respond with either "Yes," or "No," and include the explanation in your response. In addition, please include the referenced sections in your response.
        
        You must provide accurate responses based solely on the information provided in the context only. Please use the following context only:

        ### CONTEXT
        {context}

        ### QUESTION
        Question: {question}
        """

        user_template = "Question:```{question}```"
        messages = [
            SystemMessagePromptTemplate.from_template(system_template),
            HumanMessagePromptTemplate.from_template(user_template)
        ]
        qa_prompt = ChatPromptTemplate.from_messages(messages)

        llm = chat_model
        memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            chain_type='stuff',
            memory=memory,
            combine_docs_chain_kwargs={"prompt": qa_prompt}
        )
        return conversation_chain