import React from 'react'

export function ImagePreviewCard({image,setEditProfilePic}) {
    const [show, setShow] = React.useState(true);
    const closeImgPrev = ()=>{
      setShow(false);
      setEditProfilePic(false)
    }
    return (
      <>
        {show?<div
                className="card my-6  col-lg-4 "
                style={{width:'object-fit',height:'object-fit', border:'1px solid black'}}
              >
                  <div className="card-header ">
                    <h3 className="card-title">Profile Image</h3>
                    <div className="rtlcards ">
                      <button
                        size="small"
                        edge="start"
                        color="inherit"
                        className='btn btn-primary'
                        onClick={(e)=> {e.preventDefault();closeImgPrev()}}
                        aria-label="close"
                      >Edit
                      </button>
                      </div>
                  </div>
                    <div className="card-body py-3">
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}images/${image}`}
                        alt="preview"
                        style={{
                          width: "120%",
                          border:"none",
                          objectFit:"cover"
                        }}
                      />
                    </div>
                </div>:null}
      </>
    );
  }
