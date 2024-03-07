from langchain.text_splitter import RecursiveCharacterTextSplitter
import re

class ChunkDocuments:
    def __init__(self, documents):
        self.documents = documents

    def chunk_documents(self,chunk_size=1000, chunk_overlap=50):
        """Splits text into smaller chunks for processing."""
        for page in self.documents:
            page.page_content = self._remove_special_characters(page.page_content)
            page.page_content = re.sub(r'\s+', ' ', page.page_content)

        text_splitter = RecursiveCharacterTextSplitter(
            separators=["\n\n", "\n", ".", " ", ""],
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        chunks = text_splitter.split_documents(self.documents)
        return chunks
    
    def _remove_special_characters(self, text):
        # Define a regex pattern to match the special characters
        pattern = r'- | \t|●|\n|\[|\]'
        # Use re.sub() to replace matches of the pattern with an empty string
        cleaned_string = re.sub(pattern, '', text)
        return cleaned_string
