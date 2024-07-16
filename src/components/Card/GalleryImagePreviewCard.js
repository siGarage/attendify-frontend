import React,{useEffect, useRef, useState} from 'react'
import { Col, Tooltip } from 'react-bootstrap';
import { deleteGalleryImg, getGallery, replaceGalleryImage } from '../../redux/Action/PropertyAction';
import { useDispatch, useSelector } from 'react-redux';
import { DropImg } from '../Pages/Property/StepForm/component/DropImg';
import { useFormik } from "formik";

export function GalleryImagePreviewCard({image,setEditProfilePic,name,id,index}) {
    const dispatch = useDispatch()
    const ref = useRef()
    const inputRef = useRef()
    const [show, setShow] = React.useState(true);
    const closeImgPrev = ()=>{
      setShow(false);
      setEditProfilePic(false)
    }
    const gallery_details = {
        image,
        id,
        index
    }

    const gallery_imgs_for_preview = useSelector(state=>
      state?.propertyType?.gallery.filter(gallery=>gallery._id==gallery_details.id)
    )

    const handleDelete = (gallery_details)=>{
      dispatch(deleteGalleryImg(gallery_details))
      .then(()=>{
        dispatch(getGallery());
      })
    }

    const[editImgPreview,setEditImgPreview] = useState(null)
    const[isImgReplaced,setIsImgReplaced] = useState(false)
    const formik = useFormik({
      initialValues: {
        "image": image || ""
      },
      onSubmit : values =>{
        let formData = new FormData();
        formData.append("gallery_img",editImgPreview)
        for (let value in gallery_details) {
          formData.append(value, gallery_details[value]);
        }
        dispatch(replaceGalleryImage(formData))
        .then(()=>{
          dispatch(getGallery())
          setEditImage(false)
          setIsImgReplaced(true)
        })
      }
    })

    const [editImage,setEditImage] = useState(false)
    return (
      <>
        {show?<Col lg={3} md={3} 
                className="card"
                ref={ref}
              >
                <div className="card-header ">
                  <h3 className="card-title"></h3>
                  <div className="rtlcards mx-1">
                    <button
                      size="small"
                      edge="start"
                      color="inherit"
                      className='btn btn-danger'
                      onClick={(e)=> {e.preventDefault();handleDelete(gallery_details);}}
                      aria-label="close"
                    >Delete 
                    </button>
                    </div>
                </div>
                  {editImage
                    ?
                      <input 
                      type="file" 
                      name="image" 
                      id="preview_img" 
                      onChange={e=>{
                        setEditImgPreview(e.target.files[0])
                        formik.handleSubmit()
                      }}
                    />
                    :
                      <div className="card-body py-3">
                      <img
                        src={!isImgReplaced?`${process.env.REACT_APP_API_BASE_URL}/images/${image}`:
                        `${process.env.REACT_APP_API_BASE_URL}/images/${gallery_imgs_for_preview[0]?.gallery_img[index]}`}
                        alt="preview"
                        style={{
                          width:"200px",
                          //   width: "120%",
                          height: "object-fit",
                          maxHeight:"200px",
                          border:"none",
                          objectFit:"contain"
                        }}
                      />
                    </div>}
              </Col>:null}
      </>
    );
  }
