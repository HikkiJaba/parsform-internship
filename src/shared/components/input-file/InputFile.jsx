import "./InputFile.css";

const FileUpload = () => {
  return (
    <form>
      <img />
      <form id="upload-container">
          <div>
               <input className="visually-hidden" id="file-input" type="file" name="file"/>
               <label for="file-input" className="file-label">
                <h2><span>Select a file</span> or drag in form</h2>
                <div>JSON file up to 10MB in size are available for download</div>
               </label>
          </div>
     </form>

    </form>
  );
};

export default FileUpload;
