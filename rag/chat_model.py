from langchain_openai import ChatOpenAI
class ChatModel:
    def __init__(self,model_name):
        self.model_name = model_name
    def initialize_chat_model(self):
        """Initializes the chat model with specified AI model."""
        return ChatOpenAI(model_name=self.model_name, temperature=0.0)