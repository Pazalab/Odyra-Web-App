import { useState } from "react"

export const useImagePayloadProcessor = () => {
     const [ fileList, setFileList ] = useState([]);
     const [ previewUrl, setPreviewUrl ] = useState(null);
     const [ uploadStatus, setUploadStatus ] = useState(false);
     const [ fileError, setFileError ] = useState(null);

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
     const maxSizeMB = 2 * 1024 * 1024;

    const clearFileErrors = () => {
          setFileError(null)
     }

    const validateUploadedFile = (file)  => {
          clearFileErrors();

          if(!allowedTypes.includes(file.type)){
               setFileError("Invalid file type. Please upload jpg, png, or webp images only.")
               return false;
          }

          if(file.size > maxSizeMB){
               setFileError("File size exceeds 2mb. Please upload a smaller image.")
               return false;
          }

          return true;
     }

    const handleFileChange = (e) => {
          clearFileErrors();

          if(!e.target.files || e.target.files.length === 0){
               return;
          }

          const filesSelected = Array.from(e.target.files);
          const file = filesSelected[0]

          //validate uploaded file
          if(!validateUploadedFile(file)){
               setUploadStatus(false)
               return;
          }

          if(previewUrl){
               URL.revokeObjectURL(previewUrl)
          }

          setUploadStatus(true)
          setFileList(filesSelected);

         const url = URL.createObjectURL(filesSelected[0]);
         setPreviewUrl(url);
     }


    const clearSelectedImage = () => {
          if(previewUrl){
                 URL.revokeObjectURL(previewUrl)
          }
          setUploadStatus(false);
          setPreviewUrl(null);
          setFileList([])
     }

     return {
          fileList,
          uploadStatus,
          previewUrl,
          handleFileChange,
          clearSelectedImage,
          fileError
     }
}