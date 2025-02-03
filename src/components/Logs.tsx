import { useEffect, useState } from "react";
import { getLogs } from "../api/logsService";
import { getLogUser } from "../api/userService";

interface Log {
  id: string;
  query: string;
  created_at: string;
  user_id: string;
  user?: {
    firstName: string;
    lastName: string;
    rank: string;
    email: string;
  };
}

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await getLogs();

      console.log(response)

      const logsWithUserDetails = await Promise.all(
        response.map(async (log: Log) => {
          try {
            const userResponse = await fetchLogUser(log.user_id);
            return {
              ...log,
              user: userResponse,
            };
          } catch {
            return log;
          }
        })
      );

      setLogs(logsWithUserDetails);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogUser = async (id: string) => {
    try {
      const response = await getLogUser(id);
      return response;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Logs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Busqueda</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
              <th className="border border-gray-300 px-4 py-2">Hora</th>
              <th className="border border-gray-300 px-4 py-2">Usuario</th>
              <th className="border border-gray-300 px-4 py-2">Rango</th>
              <th className="border border-gray-300 px-4 py-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {log.query}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.created_at.split("T")[0]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.created_at.split("T")[1].replace("Z", "")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.user
                    ? `${log.user.firstName} ${log.user.lastName}`
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.user ? log.user.rank : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.user ? log.user.email : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Logs;
