import React from 'react'

export function TeamLeadImgPreviewCard({image,setEditTeamLeadPic}) {
    const [show, setShow] = React.useState(true);
    const closeImgPrev = ()=>{
      setShow(false);
      setEditTeamLeadPic(false)
    }
    
    return (
      <>
        {show?<div
                className="card my-6  col-lg-4 "
                style={{width:'object-fit',height:'object-fit', border:'1px solid black'}}
              >
                  <div className="card-header ">
                    <h3 className="card-title">Team Lead Image</h3>
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
                        src={`${process.env.REACT_APP_IMG_URL}${image}`}
                        alt="preview"
                        style={{
                          width: "120%",
                          maxHeight: "100px",
                          border:"none",
                          objectFit:"cover"
                        }}
                      />
                    </div>
                </div>:null}
      </>
    );
  }
