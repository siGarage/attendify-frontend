import { Modal, Button, Row, Col, Container } from "react-bootstrap";

//SuccessAlertMessages
export function SoftDeleteModal({ setShow, show, handleShow, propertyDeleteAction }) {


  return (
    <>
      <Modal show={show} >
        <Modal.Body className="text-center p-4">
          <Button
            onClick={() => setShow(false)}
            className="btn-close"
            variant=""
          >
            x
          </Button>
          <i className="fe fe-x-circle fs-65 text-danger lh-1 mb-4 d-inline-block"></i>
          <h4 className="text-danger mb-20">
            Are you sure you want to soft delete this? You can Restore it in the Restore Section. 
          </h4>
          <button
            aria-label="Close"
            className="btn btn-danger pd-x-25"
            onClick={() => {
              propertyDeleteAction();
              setShow(false);
            }}
          >
            Continue
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}