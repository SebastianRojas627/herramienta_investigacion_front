import React, { useState } from "react";
import PersonaModal from "./PersonaModal";
import VehicleModal from "./VehiculoModal";
import { PersonDetails, Vehicles } from "../interfaces/common";
import { listItv, listSegip } from "../api/searchService";
import { SearchSegip, SearchItv } from "../api/types";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

type OpenModal = {
  type: "persona" | "vehiculo";
  id: string;
};

const PersonaVehiculoForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("persona");
  const [personaData, setPersonaData] = useState<SearchSegip>({
    pat: "",
    mat: "",
    nom: "",
    ced: "",
    com: "",
  });

  const [vehiculoData, setVehiculoData] = useState<SearchItv>({
    placa: "",
  });

  const [responseData, setResponseData] = useState<any>([]);
  const [openModals, setOpenModals] = useState<OpenModal[]>([]);

  const navigate = useNavigate();

  const handleRowClick = (type: "persona" | "vehiculo", id: string) => {
    setOpenModals((prev) => [...prev, { type, id }]);
  };

  const handleDetailClick = (type: "persona" | "vehiculo", id: string) => {
    setOpenModals([]);
    navigate(`/explore/${id}`, { state: { type } });
  };

  const closeModal = (id: string) => {
    setOpenModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const openModal = (type: "persona" | "vehiculo", id: string) => {
    setOpenModals((prev) => [...prev, { type, id }]);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setResponseData([]);
  };

  const handlePersonaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonaData({ ...personaData, [name]: value });
  };

  const handleVehiculoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehiculoData({ ...vehiculoData, [name]: value });
  };

  const handleSearch = async () => {
    let response;
    try {
      if (selectedOption === "persona") {
        response = await listSegip(personaData);
      }
      if (selectedOption === "vehiculo") {
        response = await listItv(vehiculoData);
      }
      setResponseData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto p-6 bg-white">
      <Title text={"Busqueda"} className="pt-6 mb-6" />
      <form className="max-w-6xl w-full mb-6">
        <div className="mb-6">
          <label className="inline-flex items-center mr-10">
            <input
              type="radio"
              name="option"
              value="persona"
              checked={selectedOption === "persona"}
              onChange={handleOptionChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Persona</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="option"
              value="vehiculo"
              checked={selectedOption === "vehiculo"}
              onChange={handleOptionChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Vehículo</span>
          </label>
        </div>

        {selectedOption === "persona" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="pat"
                  value={personaData.pat}
                  onChange={handlePersonaChange}
                  placeholder="Apellido Paterno"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="mat"
                  value={personaData.mat}
                  onChange={handlePersonaChange}
                  placeholder="Apellido Materno"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Nombre(s)
              </label>
              <input
                type="text"
                name="nom"
                value={personaData.nom}
                onChange={handlePersonaChange}
                placeholder="Nombre(s)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  C.I.
                </label>
                <input
                  type="text"
                  name="ced"
                  value={personaData.ced}
                  onChange={handlePersonaChange}
                  placeholder="C.I."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Complemento
                </label>
                <select
                  name="com"
                  value={personaData.com}
                  onChange={handlePersonaChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedOption === "vehiculo" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Placa
            </label>
            <input
              type="text"
              name="placa"
              value={vehiculoData.placa}
              onChange={handleVehiculoChange}
              placeholder="Placa"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto mt-6 flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          {responseData.length > 0 && selectedOption === "vehiculo" && (
            <div className="overflow-x-auto">
              <Title text="Resultados:" />
              <table className="min-w-full table-auto border-collapse border border-gray-300 mt-8 mb-12">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Placa</th>
                    <th className="border border-gray-300 px-4 py-2">Marca</th>
                    <th className="border border-gray-300 px-4 py-2">Modelo</th>
                    <th className="border border-gray-300 px-4 py-2">Color</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((item: Vehicles) => (
                    <tr key={item.datos_tecnicos.placa}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.datos_tecnicos.placa}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.datos_tecnicos.marca}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.datos_tecnicos.modelo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.datos_tecnicos.color}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex flex-col mx-auto items-center space-y-2 md:space-y-0">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(
                                "vehiculo",
                                item.datos_tecnicos.placa
                              );
                            }}
                          >
                            Vehiculo
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDetailClick(
                                "vehiculo",
                                item.datos_tecnicos.placa
                              );
                            }}
                          >
                            Detalle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {responseData.length > 0 && selectedOption === "persona" && (
            <div className="overflow-x-auto">
              <Title text="Resultados:" />
              <table className="min-w-full table-auto border-collapse border border-gray-300 mt-8 mb-12">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Nombre Completo
                    </th>
                    <th className="border border-gray-300 px-4 py-2">C.I.</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Domicilio
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Antecedentes FELCC
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Antecedentes FELCN
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Antecedentes Tránsito
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((item: PersonDetails) => (
                    <tr key={item.NumeroDocumento}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.Nombres +
                          " " +
                          item.PrimerApellido +
                          " " +
                          item.SegundoApellido}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.NumeroDocumento}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.Domicilio}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.Antecedentes.Felcc}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.Antecedentes.Felcn}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.Antecedentes.Transito}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex flex-col mx-auto items-center space-y-2 md:space-y-0">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick("persona", item.NumeroDocumento);
                            }}
                          >
                            Persona
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDetailClick(
                                "persona",
                                item.NumeroDocumento
                              );
                            }}
                          >
                            Detalle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {openModals.map((modal) => {
        if (modal.type === "persona") {
          return (
            <PersonaModal
              key={modal.id}
              title={modal.type}
              documento={modal.id}
              closeModal={() => closeModal(modal.id)}
              openModal={openModal}
            />
          );
        } else if (modal.type === "vehiculo") {
          return (
            <VehicleModal
              key={modal.id}
              title={modal.type}
              placa={modal.id}
              closeModal={() => closeModal(modal.id)}
              openModal={openModal}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default PersonaVehiculoForm;
