import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";

export function DropImg({imgtype,formik}) {
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status,allFiles) => {
    // console.log( meta,allFiles,imgtype,meta.height == 180 && meta.width==180,"image-aj");
    // if(imgtype == "logo" && meta.status == 'done'){
    //   if(meta.height == 180 && meta.width==180){
    //     formik.setFieldValue("logo",allFiles[0].file)
    //   }else if(meta.height != 180 && meta.width!=180){
    //     allFiles.forEach((f) => f.remove());
    //   }
    // }
    if(imgtype == "logo"){
      formik.setFieldValue("logo",allFiles[0].file)
    }
    if(imgtype == "featured"){
      const arr = [];
      allFiles.forEach((f) => arr.push(f.file));
      formik.setFieldValue("featured_img",arr)
     }
     if(imgtype == "gallery"){
      const arr = [];
      allFiles.forEach((f) => arr.push(f.file));
      formik.setFieldValue("gallery_img",arr)
     }
     if(imgtype == "image"){
      formik.setFieldValue("image",allFiles[0].file)
     }
     if(imgtype == "placement"){
      formik.setFieldValue("placement_img",allFiles[0].file)
     }
     if(imgtype == "loan_img"){
      formik.setFieldValue("loan_img",allFiles[0].file)
     }
     if(imgtype == "admission_process_img"){
      formik.setFieldValue("admission_process_img",allFiles[0].file)
     }
     if(imgtype == "scholarship_img"){
      formik.setFieldValue("scholarship_img",allFiles[0].file)
     }
     if(imgtype == "announcement_img"){
      formik.setFieldValue("announcement_img",allFiles[0].file)
     }
     if(imgtype == "profile"){
      formik.setFieldValue("profile",allFiles[0].file)
     }
     if(imgtype == 'property_img'){
      formik.setFieldValue("property_img",allFiles[0].file)
     }
   // allFiles.forEach((f) => f.remove());
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta),"img drop");
    allFiles.forEach((f) => f.remove());
  };
  
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
    //  onSubmit={handleSubmit}
       maxFiles={(imgtype == "logo" 
       || imgtype == "image" 
       || imgtype == "placement"
       || imgtype == "loan_img"
       || imgtype == "admission_process_img"
       || imgtype == "scholarship_img"
       || imgtype == "property_img"
       || imgtype == "announcement_img") ? 1 : 20}
    />
  );
}