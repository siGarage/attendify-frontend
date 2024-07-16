import { Modal, Button, Row, Col, Container } from "react-bootstrap";

//SuccessAlertMessages
export function WarningModal({
  setShow,
  show,
  handleShow,
  propertyDeleteAction,
  handleClose,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={propertyDeleteAction}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal show={show}>
        <Modal.Body className="text-center p-4">
          <Button
            onClick={() => handleClose()}
            className="btn-close"
            variant=""
          >
            x
          </Button>
          <i className="fe fe-x-circle fs-65 text-danger lh-1 mb-4 d-inline-block"></i>
          <h4 className="text-danger mb-20"></h4>

          <button
            aria-label="Close"
            className="btn btn-danger pd-x-25"
            onClick={() => {
              handleClose();
            }}
          ></button>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
