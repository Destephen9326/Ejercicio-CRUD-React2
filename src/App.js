import './App.css';
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./services/categoryService";
import Swal from "sweetalert2";

function App() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Error al cargar categorías", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCategory = async (data) => {
    try {
      await createCategory(data);
      Swal.fire("Éxito", "Categoría creada", "success");
      loadData();
    } catch (err) {
      Swal.fire("Error", "No se pudo crear", "error");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateCategory(data.id, data);
      Swal.fire("Actualizado", "Categoría actualizada", "success");
      setSelected(null);
      loadData();
    } catch (err) {
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCategory(id);
        Swal.fire("Eliminado", "Categoría eliminada", "success");
        loadData();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">CRUD de Categorías</h2>
      <CategoryForm
        addCategory={addCategory}
        updateCategory={handleUpdate}
        selected={selected}
        setSelected={setSelected}
      />
      <CategoryList
        categories={categories}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default App;
