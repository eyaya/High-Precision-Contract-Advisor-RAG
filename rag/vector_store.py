from langchain.vectorstores.chroma import Chroma


class VectorStore:
    def __init__(self, documents,embedding,persist_directory):
        self.documents = documents
        self.embedding = embedding
        self.persist_directory = persist_directory

    def create_vector_store(self):
        """Creates the vector store."""
        vector_store_db = Chroma.from_documents(self.documents,self.embedding, persist_directory=self.persist_directory)
        return vector_store_db