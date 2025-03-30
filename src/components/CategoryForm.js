import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const initialForm = {
  name: "",
  image: ""
};

const CategoryForm = ({ addCategory, updateCategory, selected, setSelected }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.image) {
      return alert("Todos los campos son obligatorios"); // Luego cambiamos esto a sweetalert
    }

    selected ? updateCategory(form) : addCategory(form);
    setForm(initialForm);
    setSelected(null);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>URL de Imagen</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className="mt-3">
        {selected ? "Actualizar Categoría" : "Agregar Categoría"}
      </Button>
    </Form>
  );
};

export default CategoryForm;
