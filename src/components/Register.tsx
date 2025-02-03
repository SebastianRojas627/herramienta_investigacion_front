// src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import ButtonSubmit from "./ButtonSubmit";
import { createUser } from "../api/userService";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    rank: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = createUser(formData);
      setSuccess("Registration successful!");
      setError("");
      console.log(response);
    } catch (error) {
      setError("Registration failed.");
      setSuccess("");
      console.log(error);
    }
  };

  const routeLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          title="Correo"
          handleChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
        />
        <FormField
          title="Nombre"
          handleChange={handleChange}
          type="text"
          name="firstName"
          value={formData.firstName}
        />
        <FormField
          title="Apellido"
          handleChange={handleChange}
          type="text"
          name="lastName"
          value={formData.lastName}
        />
        <FormField
          title="Rango"
          handleChange={handleChange}
          type="text"
          name="rank"
          value={formData.rank}
        />
        <FormField
          title="Contraseña"
          handleChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <ButtonSubmit title="Registrar" />
        <p className="text-blue-500 mb-4 cursor-pointer" onClick={routeLogin}>
          Ya tiene una cuenta?
        </p>
      </form>
    </div>
  );
}

export default Register;
