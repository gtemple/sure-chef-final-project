import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";

const KitchenForm = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [storageLocationError, setStorageLocationError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (storageLocation === "") {
      setStorageLocationError(true);
    } else {
      // Handle form submission here
      axios
        .post("/api/kitchenItems", {
          name: name,
          quantity: quantity,
          storage_location: storageLocation,
          userId: props.user.id,
        })
        .then((res) => {
          props.showOnAdd({
            name,
            quantity,
            storage_location: storageLocation,
            id: res.data.res.id,
            user_id: props.user.id,
          });
          props.handleAddItem();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="storageLocation">
          <Form.Label>Storage Location:</Form.Label>
          <Form.Control
            as="select"
            value={storageLocation}
            onChange={(event) => setStorageLocation(event.target.value)}
          >
            <option value="">Select a storage location</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Freezer">Freezer</option>
            <option value="Pantry">Pantry</option>
          </Form.Control>
          {storageLocationError && (
            <Form.Text className="text-danger">
              Please select a storage location.
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </Container>
  );
};

export default KitchenForm;