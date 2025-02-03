import { useState, useEffect } from "react";
import FormField from "./FormField";
import ButtonSubmit from "./ButtonSubmit";
import { getUser, updateUser } from "../api/userService";
import Title from "./Title";

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    rank: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData)
      console.log("User information updated:", response);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser()
        console.log(response);
        setFormData(response.user)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Title text="Actualizar Informacion de Usuario" className="pt-6 mb-3" />
        <form onSubmit={handleSubmit}>
          <FormField
            title="Correo"
            handleChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="New Email"
          />
          <FormField
            title="Nombre"
            handleChange={handleChange}
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="New First Name"
          />
          <FormField
            title="Apellido"
            handleChange={handleChange}
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="New Last Name"
          />
          <FormField
            title="Rango"
            handleChange={handleChange}
            type="text"
            name="rank"
            value={formData.rank}
            placeholder="New Rank"
          />
          <ButtonSubmit title="Update" />
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
