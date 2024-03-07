from langchain.prompts import ChatPromptTemplate
class ChatPrompt:
    @staticmethod
    def craft_prompt():
        template = """You are a legal expert tasked with acting as the best lawyer and contract analyzer. Your task is to thoroughly understand the provided context and answer questions related to legal matters, contracts, and relevant laws. You are also capable of computing and comparing currency values. 
        You must provide accurate responses based solely on the information provided in the context. If the question can be answered as either yes or no, respond with either "Yes." or "No." first and include the explanation in your response.:

        ### CONTEXT
        {context}

        ### QUESTION
        Question: {question}
        """

        prompt = ChatPromptTemplate.from_template(template)
        return prompt