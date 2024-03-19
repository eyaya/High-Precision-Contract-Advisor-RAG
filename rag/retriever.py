from langchain.retrievers import ParentDocumentRetriever
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.storage import InMemoryStore
from langchain.vectorstores.chroma import Chroma

class Retriever:
    def __init__(self, documents,embedding,persist_directory):
        self.documents = documents
        self.embedding = embedding
        self.persist_directory = persist_directory
        

    def get_retriever(self):
        try:
            # This text splitter is used to create the parent documents
            parent_splitter = RecursiveCharacterTextSplitter(chunk_size=1500,chunk_overlap=20)
            # This text splitter is used to create the child documents
            # It should create documents smaller than the parent
            child_splitter = RecursiveCharacterTextSplitter(chunk_size=600,chunk_overlap=20)
            # The vectorstore to use to index the child chunks
            vectorstore = Chroma(
                collection_name="contract", embedding_function=self.embedding,persist_directory=self.persist_directory
                )
            # The storage layer for the parent documents
            store = InMemoryStore()
            retriever = ParentDocumentRetriever(
                vectorstore=vectorstore,
                docstore=store,
                child_splitter=child_splitter,
                parent_splitter=parent_splitter,
            )
            retriever.add_documents(self.documents)
            print("Retriever created successfully!")
            return retriever
        except Exception as e:
            print(e)
