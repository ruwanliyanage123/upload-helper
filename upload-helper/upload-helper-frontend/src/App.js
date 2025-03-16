import "./App.css";
import { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadMessage(""); // Reset message when a new file is selected
  };

  const upload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file first.");
      return;
    }

    try {
      // Step 1: Get the pre-signed URL
      const response = await fetch("http://127.0.0.1:8000/pre-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_name: selectedFile.name,
          file_type: selectedFile.type,
        }),
      });

      const data = await response.json();
      const preSignedUrl = data["pre_signed_url"];

      if (!preSignedUrl) {
        setUploadMessage("Failed to get pre-signed URL.");
        return;
      }

      // Step 2: Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(preSignedUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      if (uploadResponse.ok) {
        setUploadMessage("✅ File uploaded successfully!");
      } else {
        setUploadMessage("❌ File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("❌ An error occurred while uploading the file.");
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={fileHandler} />
      {selectedFile && (
        <div>
          <p>
            <strong>File Name:</strong> {selectedFile.name}
          </p>
          <p>
            <strong>File Type:</strong> {selectedFile.type}
          </p>
        </div>
      )}
      <button onClick={upload}>UPLOAD</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default App;
