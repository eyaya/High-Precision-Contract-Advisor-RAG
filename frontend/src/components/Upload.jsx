import { useState } from "react";
import { useRouter } from 'next/navigation'
const swal = require('sweetalert2')


function Upload() {
  
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    swal.fire({
      title: "File loading...",
      icon: "success",
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
  })
    
    const formData = new FormData(e.target);

    await fetch("http://127.0.0.1:8080/upload_file", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch((error) => {
      console.error("Error uploading the file:", error);
      });
      
      setIsUploading(false);
  };
  const info = [
    { text: "Years experience", count: "04" },
    { text: "Completed Projects", count: "24" },
    { text: "Companies Work", count: "06" },
  ];
  

  return (
      <div className="container-fluid pt-5 px-10">
        <section id="about" className="py-10 text-white">
          <div className="text-center mt-8">
          
          <h2 className="text-1xl font-semibold">
            Upload your file here 
          </h2>
          
            <form encType="multipart/form-data" onSubmit={handleFileSubmit}>
              <div className="mb-3">
                <input
                  name="file"
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>
              {isUploading ? 
              <button disabled type="button btn-primary" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
              </button> : <button  type="button btn-primary" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              Submit
              </button>}
              
              </form>
          </div>
        </section>
      </div>
  );
}

export default Upload;