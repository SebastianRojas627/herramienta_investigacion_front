import React, { useEffect, useState } from "react";
import { PersonDetails } from "../interfaces/common";
import { getOneSegip } from "../api/searchService";

interface PersonaModalProps {
  title: string;
  documento: string;
  closeModal: () => void;
  openModal: (type: "persona" | "vehiculo", id: string) => void;
}

const PersonaModal: React.FC<PersonaModalProps> = ({
  documento,
  closeModal,
}) => {
  const [personaData, setPersonaData] = useState<PersonDetails | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await getOneSegip({
          pat: "",
          mat: "",
          nom: "",
          ced: documento,
          com: "",
        });
        console.log("personaData", response);
        setPersonaData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPersona();
  }, []);

  return (
    <>
      {personaData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-[80%] sm:w-[60%] lg:w-[50%] max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="modal-header sticky top-0 bg-blue-600 text-white px-6 py-3 z-10 flex justify-between items-center">
              <h2>
                {personaData.Nombres +
                  " " +
                  personaData.PrimerApellido +
                  " " +
                  personaData.SegundoApellido}
              </h2>
              <button onClick={closeModal} className="text-white text-2xl">
                ×
              </button>
            </div>

            <div className="p-4">
              {personaData.Fotografia && (
                <div className="mb-4 text-center">
                  <img
                    src={`data:image/jpeg;base64,${personaData.Fotografia}`}
                    alt="Fotografía"
                    className="w-32 h-32 object-cover mx-auto rounded-full"
                  />
                  <p className="mt-2 text-sm font-medium">Fotografía</p>
                </div>
              )}

              <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(personaData).map(([key, value]) => {
                  if (
                    key === "Fotografia" ||
                    key === "Antecedentes" ||
                    key === "Relations"
                  )
                    return null;

                  return (
                    <div key={key} className="mb-4">
                      <label className="text-sm font-medium">{key}</label>
                      <input
                        type="text"
                        value={value}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonaModal;
