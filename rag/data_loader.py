from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import Docx2txtLoader, UnstructuredWordDocumentLoader

from langchain_community.document_loaders import TextLoader

import tempfile

class LoadDocuments:
    def __init__(self, uploaded_files):
        self.uploaded_files = uploaded_files

    def load_document(self):
        """Loads and splits the document into pages."""
        try:            
            if self.uploaded_files is not None:
                file  = self.uploaded_files
                documents = []
                
                with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                    tmp_file.write(file.content.tobytes())
                    filename = file.name
                    if filename.endswith('.pdf'):
                        print(filename)
                        loader = PyPDFLoader(tmp_file.name)
                        documents=loader.load()
                    elif filename.endswith('.docx') or filename.endswith('.doc'):
                        loader = UnstructuredWordDocumentLoader(tmp_file.name)
                        documents=loader.load()
                    elif filename.endswith('.txt'):
                        loader = TextLoader(tmp_file.name)
                        documents.extend(loader.load())
                    print("Documents loaded successfully!")
                return documents
            return None
        except FileNotFoundError as e:
            print(e)