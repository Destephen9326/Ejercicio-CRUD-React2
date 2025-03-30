import React from "react";
import { Table, Button, Image } from "react-bootstrap";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <tr key={cat.id}>
            <td><Image src={cat.image} width={60} rounded /></td>
            <td>{cat.name}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(cat)} className="me-2">Editar</Button>
              <Button variant="danger" onClick={() => onDelete(cat.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryList;
