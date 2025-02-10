import { useEffect, useState } from "react";
import { getLogs } from "../api/logsService";
import { getLogUser } from "../api/userService";
import { Log, UserLog } from "@/api/types";
import VehicleModal from "./VehiculoModal";
import PersonaModal from "./PersonaModal";

interface Logs {
  log: Log;
  user: UserLog;
}

type OpenModal = {
  type: string;
  id: string;
};

const Logs = () => {
  const [logs, setLogs] = useState<Logs[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<OpenModal | null>(null);

  const handleBusquedaClick = (type: string, id: string) => {
    setModal({ type, id });
  };

  const closeModal = () => {
    setModal(null);
    document.body.classList.remove("overflow-hidden");
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await getLogs();

      const logsWithUserDetails = await Promise.all(
        response.map(async (log: Log) => {
          const userResponse = await fetchLogUser(log.user_id);
          const answer = {
            log: { ...log },
            user: { ...userResponse! },
          };
          return answer;
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
    <div className="overflow-hidden container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Logs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Busqueda</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
              <th className="border border-gray-300 px-4 py-2">Hora</th>
              <th className="border border-gray-300 px-4 py-2">Usuario</th>
              <th className="border border-gray-300 px-4 py-2">Rango</th>
              <th className="border border-gray-300 px-4 py-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.log.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 ">
                  <button
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBusquedaClick(log.log.tipo, log.log.busqueda);
                    }}
                  >
                    {log.log.busqueda}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.log.tipo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.log.created_at.split("T")[0]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {log.log.created_at.split("T")[1].replace("Z", "")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${log.user.firstName} ${log.user.lastName}`}
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

      {modal && modal.type === "vehiculo" && (
        <VehicleModal
          key={modal.id}
          title={modal.type}
          placa={modal.id}
          closeModal={() => closeModal()}
        />
      )}

      {modal && modal.type === "persona" && (
        <PersonaModal
          key={modal.id}
          title={modal.type}
          documento={modal.id}
          closeModal={() => closeModal()}
        />
      )}
    </div>
  );
};

export default Logs;
