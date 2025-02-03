import { useEffect, useState } from "react";
import { getUsers, userRoleChange } from "../api/userService";
import Title from "./Title";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  rank: string;
  role: string;
}

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update the role of a user
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await userRoleChange(userId, newRole);
      alert(`User's role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role");
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Title text="Informacion de Usuario" className="pt-6 mb-3"/>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Correo</th>
              <th className="border border-gray-300 px-4 py-2">Nombres</th>
              <th className="border border-gray-300 px-4 py-2">Apellido</th>
              <th className="border border-gray-300 px-4 py-2">Rango</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.rank}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="user">User</option>
                    <option value="super-user">Super User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAdmin;
