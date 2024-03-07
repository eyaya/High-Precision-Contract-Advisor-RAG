from langchain_openai import OpenAIEmbeddings



class EmbeddingsCreator:
    def create_embeddings(self):
        """Creates embeddings from text."""
        return OpenAIEmbeddings()