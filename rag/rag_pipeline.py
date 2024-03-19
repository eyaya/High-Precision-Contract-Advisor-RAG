from data_loader import LoadDocuments
#from chunk_documents import ChunkDocuments
from embedding import EmbeddingsCreator
#from vector_store import VectorStore
from retriever import Retriever
from chat_model import ChatModel
from conversation_chain import ConversationChain
from dotenv import load_dotenv, find_dotenv

load_dotenv()
GPT_MODEL_NAME = 'gpt-3.5-turbo'
load_dotenv(find_dotenv())

class RAGPipeline:
    def __init__(self,
                 uploaded_file,
                 vector_db_path,
                 ):
        self.uploaded_file = uploaded_file
        self.vector_db_path = vector_db_path
    def pipeline(self):
        loader = LoadDocuments(self.uploaded_file)
        documents = loader.load_document()
        #chunk_documents = ChunkDocuments(documents)
        #chunks = chunk_documents.chunk_documents()
        embedding = EmbeddingsCreator().create_embeddings()
        #vector_store = VectorStore(chunks,embedding,self.vector_db_path)
        #vectorstore = vector_store.create_vector_store()
        retriever = Retriever(documents,embedding,self.vector_db_path).get_retriever()
        print("Retriever Created Successfully!")
        return retriever
    
    def qa_chain(self):
        chat_model = ChatModel(GPT_MODEL_NAME).initialize_chat_model()
        retriever = self.pipeline()
        conversation_chain = ConversationChain().create_retrieval_qa_chain(chat_model,retriever)
        return conversation_chain


        
        
    
