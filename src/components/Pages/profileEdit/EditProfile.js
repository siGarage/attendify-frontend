import React, { useEffect, useState ,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { ImagePreviewCard } from '../../Card/ImagePreviewCard';
import JoditEditor from 'jodit-react';
import { fetchLoginUserById, userProfileUpdate } from '../../../redux/Action/AuthAction';
import { DropImg } from '../Property/StepForm/component/DropImg';

const EditProfile = () => {
  const dispatch = useDispatch();
  const {users} = useSelector(state => ({
    users: state?.userAuth?.loginUser,
  })); 

  const {id} = useParams() 
  
  useEffect(() => {
    dispatch(fetchLoginUserById(sessionStorage.getItem("userId")))
  }, [])
  
  const profileData = users?.user
  const editor = useRef(null);
  const [content, setContent] = useState(profileData?.description || "");
  const [file, setFile] = useState("");
  const [preview,setPreview] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null);
  const [editProfilePic,setEditProfilePic] = useState(profileData?.image?true:false)
  const formik = useFormik({
    initialValues:{
      "name":profileData?.name || '',
      "description": profileData?.description || '',
      "image": profileData?.image || ""
    },
    onSubmit:(values)=>{
      values = { ...formik.values, "description": content, id }
      let formData = new FormData();
      for (let value in values) {
          formData.append(value, values[value]);
      }
      dispatch(userProfileUpdate(formData));
    }
  })

  return (
    <div className="container bg-white p-3 mt-5">
        <div className="row ">
            <div className="col">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Link 
                          to={`${process.env.PUBLIC_URL}/profile`}
                          className="d-flex flex-row align-items-center back">
                            <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                            <h6>Back to Profile</h6>
                        </Link>
                        <h6 className="text-right">Edit Profile</h6>
                    </div>
                    <form action="post" onSubmit={formik.handleSubmit}>
                      <div className="row mt-2">
                          <label htmlFor="name" className="form-label">User Name</label>
                          <div className="col-lg-12">
                            <input type="text" 
                            className="form-control" 
                            id='name' 
                            placeholder="Please enter User name" 
                            value={formik?.values?.name}
                            onChange={formik?.handleChange}
                            />
                          </div>
                      </div>
                       <div className="row mt-3">
                          <div className="col-lg-12">
                            <label htmlFor="description" className="form-label">Biography</label>
                            <JoditEditor
                              ref={editor}
                              value={formik.values.description}
                              onChange={newContent => {setContent(newContent)}}
                            />
                          </div>
                      </div> 
                      
                      <div className='row mt-3"'>
                      {editProfilePic
                       ? 
                        <ImagePreviewCard preview={preview} image={profileData?.image} fileDataURL={fileDataURL} setPreview={setPreview} setFile={setFile} setFileDataURL={setFileDataURL} setEditProfilePic={setEditProfilePic} />
                       : 
                        <div className="row mt-3 ml-0" style={{margin:"initial"}}>
                        <label htmlFor="image" className="form-label">Profile Picture</label>
                        <DropImg
                            type="file" className="dropify" imgtype="image"
                            formik ={formik}
                        />
                        </div>
                      }
                      </div>
                      <div className="mt-5 d-flex justify-content-end">
                        <button className="btn btn-primary profile-button" type="button" onClick={()=>formik.handleSubmit()}>
                          Save Profile
                        </button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile
