import React, { useEffect, useState } from "react";
import { getOneItv } from "../api/searchService";
import { DetailsItv } from "@/api/types";

interface VehicleModalProps {
  title: string;
  placa: string;
  closeModal: () => void;
  openModal: (type: "persona" | "vehiculo", id: string) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ placa, closeModal }) => {
  const [vehicleData, setVehicleData] = useState<DetailsItv | null>(null);

  useEffect(() => {
    const query = { placa };

    const fetchVehicle = async () => {
      try {
        const response = await getOneItv(query);
        setVehicleData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchVehicle();
  }, []);

  return (
    <>
      {vehicleData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-[80%] sm:w-[60%] lg:w-[50%] max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="modal-header sticky top-0 bg-blue-600 text-white px-6 py-3 z-10 flex justify-between items-center">
              <h2>
                {vehicleData.datos_tecnicos.marca +
                  " " +
                  vehicleData.datos_tecnicos.modelo}
              </h2>
              <button onClick={closeModal} className="text-white text-2xl">
                ×
              </button>
            </div>

            <div className="p-4">
              {vehicleData.Fotografia && (
                <div className="mb-4 text-center">
                  <img
                    src={`data:image/jpeg;base64,${vehicleData.Fotografia}`}
                    alt="Fotografía"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium">Fotografía</p>
                </div>
              )}

              {vehicleData.datos_tecnicos && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Datos Técnicos</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(vehicleData.datos_tecnicos).map(
                      ([key, value]) => (
                        <div key={key}>
                          <label className="text-sm font-medium">{key}</label>
                          <input
                            type="text"
                            value={String(value)}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleModal;
