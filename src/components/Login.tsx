// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import ButtonSubmit from "./ButtonSubmit";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/searcho");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const routeCreate = () => {
    navigate("/register");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          title="Correo"
          handleChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
        />
        <FormField
          title="Contraseña"
          handleChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ButtonSubmit title="Ingresar" />
        <p className="text-blue-500 mb-4 cursor-pointer" onClick={routeCreate}>
          Crear Cuenta
        </p>
      </form>
    </div>
  );
}

export default Login;
