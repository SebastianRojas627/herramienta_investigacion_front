import React from "react";
import Draggable from "react-draggable";

interface ModalProps {
  type: "persona" | "vehiculo";
  data: any; // Row data
  onClose: () => void; // Close callback
}

const ReusableModal: React.FC<ModalProps> = ({ type, data, onClose }) => {
  if (!data) return null; // Guard for empty data

  // Function to render fields dynamically
  const renderFields = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      // If value is an object, render its fields recursively
      if (typeof value === "object" && value !== null) {
        
        if (key !== "antecedentes") {
          return (
            <div key={key} className="col-span-3 mt-4">
              <h3 className="font-bold text-gray-700">{key}</h3>
              <div className="grid grid-cols-3 gap-4 ml-4">
                {renderFields(value)}
              </div>
            </div>
          );
        } else {
          return ;
        }
      }

      // Render individual field
      return (
        <div key={key} className="col-span-1">
          <label className="block font-semibold capitalize text-sm mb-1">
            {key.replace(/_/g, " ")}:
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 w-full"
            readOnly
            value={value || ""}
          />
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Draggable>
      <div className="bg-white rounded-md shadow-lg w-11/12 max-w-3xl h-4/5 overflow-hidden">
        {/* Blue Bar */}
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {type === "persona" ? "Persona Details" : "Vehículo Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 font-bold"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto h-full">
          <form className="grid grid-cols-3 gap-4">
            {type === "vehiculo" && data.datos_tecnicos
              ? // Render only datos_tecnicos for vehiculo
                renderFields(data.datos_tecnicos)
              : // Render all fields for persona
                renderFields(data)}
          </form>

          {/* Add space for antecedente fields and button for persona */}
          {type === "persona" && data.antecedentes && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Antecedentes:</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(data.antecedentes).map(([key, value]) => (
                  <div key={key} className="col-span-1">
                    <label className="block font-semibold capitalize text-sm mb-1">
                      {key.replace(/_/g, " ")}:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      readOnly
                      value={value || ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Button below the form */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => alert("Button clicked")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
            >
              Action Button
            </button>
          </div>
        </div>
      </div>
      </Draggable>
    </div>
  );
};

export default ReusableModal;
