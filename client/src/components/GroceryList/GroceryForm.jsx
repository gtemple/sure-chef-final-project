import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const GroceryForm = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [storageLocation, setStorageLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    axios
      .post("/api/groceryItems", {
        name: name,
        quantity: quantity,
        storageLocation: storageLocation,
        userId: props.user.id,
      })
      .then((res) => {
        props.showOnAdd({
          name,
          quantity,
          storage_location: storageLocation,
          id: res.data.res.id,
          groceryListId: props.userGroceries[0].grocery_id,
          user_id: props.user.id,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <Form className="grocery-main" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
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
        </Form.Group>
        <Button type="submit">Add Item</Button>
      </Form>
    </section>
  );
};

export default GroceryForm;
