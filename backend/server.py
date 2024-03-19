from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader 

from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CohereRerank



from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename #pip install Werkzeug
import os
from dotenv import load_dotenv,find_dotenv
import sys
sys.path.append('../rag')

from rag_pipeline import RAGPipeline


app = Flask(__name__)
CORS(app)


GPT_MODEL_NAME = 'gpt-3.5-turbo'
vector_db_path = "../data/chroma_db/"
load_dotenv(find_dotenv())
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'docx', 'doc'])
upload_dir = 'uploads'  # Specify the directory where you want to save uploaded files
vector_store_db = '../data/chroma_db'
global qa_chain
 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/upload_file', methods=['POST'])
def upload_file():
    global qa_chain

    if 'file' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
    
    file = request.files['file']
    error ={}
    success = False
    if file.filename == '':
        error['message'] = 'No selected file'
        error['status'] = 'failed'
        resp = jsonify(error)
        resp.status_code = 500
        return resp
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        os.makedirs(upload_dir, exist_ok=True)
        print(filename)
        file.save(os.path.join(upload_dir, filename))
        rag = RAGPipeline(filename,vector_store_db)
        qa_chain = rag.qa_chain()  

        success = True
    else:
        resp = jsonify({
            "message": 'File type is not allowed',
            "status": 'failed'
            })
        return resp
    
    if success and error:
        error['message'] = 'File(s) successfully uploaded'
        error['status'] = 'failed'
        resp = jsonify(error)
        resp.status_code = 500
        return resp

    if success:
        resp = jsonify({'message': 'File uploaded successfully', 'status_code': '201'})
        return resp
    else:
        resp = jsonify(error)
        resp.status_code = 500
        return resp

@app.route('/ask_ai', methods=['POST'])
def query_endpoint():
    try:
        data = request.get_json()
        user_question = data.get('prompt')
        print("question", user_question)
        chat_history=[]
        response_node = qa_chain.invoke({"question": user_question, "chat_history": chat_history})
        return jsonify({'result':  response_node['answer']})

    except Exception as e:
        return jsonify({'error':  f"An error occurred: {e}"})
    
     

if __name__ == '__main__':
    app.run(debug=True, port="8080")