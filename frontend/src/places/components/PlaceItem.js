import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import "./PlaceItem.css";
import Map from "../../shared/components/UIElements/Map";
import { Modal as BootModal } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";

function DeleteModal(props) {
  return (
    <BootModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootModal.Header closeButton>
        <BootModal.Title id="contained-modal-title-vcenter">
          Delete Place.
        </BootModal.Title>
      </BootModal.Header>
      <BootModal.Body>
        <h4>Deleting...</h4>
        <p>You are deleting!!!</p>
      </BootModal.Body>
      <BootModal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </BootModal.Footer>
    </BootModal>
  );
}

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              danger
              onClick={() => {
                console.log("Deleting...");
                setShowConfirmModal(false);
              }}
            >
              {" "}
              Delete
            </Button>
          </React.Fragment>
        }
      ></Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={() => setShowConfirmModal(true)}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
