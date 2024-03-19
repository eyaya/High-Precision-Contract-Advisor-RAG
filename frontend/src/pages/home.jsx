import { useState } from "react";
import { useRouter } from 'next/navigation'


function Upload() {
  
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    console.log("File uploading...");
    const formData = new FormData(e.target);

    await fetch("http://127.0.0.1:8080/upload_file", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      alert(JSON.stringify(`${data.message}, status: ${data.status_code}`));
      router.push('/chat');
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
    <div>
      
      <div className="container-fluid pt-5">
        <section id="about" className="py-10 text-white">
          <div className="text-center mt-8">
            <form encType="multipart/form-data" onSubmit={handleFileSubmit}>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload your file
                </label>
                <input
                  name="file"
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit" disabled={isUploading}>
                  Submit
                </button>
                </div>
              </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Upload;