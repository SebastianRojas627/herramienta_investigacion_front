import React, { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import MainPanel from "./MainPanel";
import RelationsList from "./RelationsList";
import EntityModal from "./EntityModal";
import { useLocation, useParams } from "react-router-dom";
import { getOneItv, getOneSegip } from "../api/searchService";
import { DetailsItv, DetailsSegip, ListItv, ListSegip } from "../api/types";

const EntityExplorer: React.FC = () => {
  const [currentEntity, setCurrentEntity] = useState<
    DetailsSegip | DetailsItv | null
  >(null);
  const [history, setHistory] = useState<
    { id: string; search: string; name: string; type: string }[]
  >([]);
  const [modalEntity, setModalEntity] = useState<ListSegip | ListItv | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const { id } = useParams();
  const location = useLocation();
  const entityType = location.state?.type;

  const isListSegip = (entity: ListSegip | ListItv): entity is ListSegip =>
    "NumeroDocumento" in entity;

  const isListItv = (entity: ListSegip | ListItv): entity is ListItv =>
    "datos_tecnicos" in entity;

  const isDetailsSegip = (
    entity: DetailsSegip | DetailsItv
  ): entity is DetailsSegip => "Antecedentes" in entity;

  const isDetailsItv = (
    entity: DetailsSegip | DetailsItv
  ): entity is DetailsItv => "datos_tecnicos" in entity;

  const fetchVehiculo = async (placa: string) => {
    try {
      const response = await getOneItv({ placa: String(placa) });
      setCurrentEntity(response);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  const fetchPersona = async (documento: string) => {
    try {
      const response = await getOneSegip({
        pat: "",
        mat: "",
        nom: "",
        ced: String(documento),
        com: "",
      });
      setCurrentEntity(response);
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  useEffect(() => {
    if (entityType === "persona") {
      fetchPersona(String(id));
    } else if (entityType === "vehiculo") {
      fetchVehiculo(String(id));
    }
  }, [entityType]);

  const handleEntityClick = async (entity: ListSegip | ListItv) => {
    if (isDetailsItv(currentEntity!))
      setHistory((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          search: currentEntity.datos_tecnicos.placa,
          name:
            currentEntity.datos_tecnicos.marca +
            " " +
            currentEntity.datos_tecnicos.modelo,
          type: "vehiculo",
        },
      ]);
    if (isDetailsSegip(currentEntity!))
      setHistory((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          search: currentEntity.NumeroDocumento,
          name: currentEntity.Nombres + " " + currentEntity.PrimerApellido,
          type: "persona",
        },
      ]);

    console.log("handleentityclick", entity);
    if (isListSegip(entity)) fetchPersona(entity.NumeroDocumento);
    if (isListItv(entity)) fetchVehiculo(entity.datos_tecnicos.placa);
  };

  const handleBackClick = async () => {
    const previous = history.pop();
    if (previous?.type === "persona") fetchPersona(previous.search);
    if (previous?.type === "vehiculo") fetchVehiculo(previous.search);
    setHistory([...history]);
  };

  const handleEntityHover = (
    title: string,
    entity: ListSegip | ListItv | null,
    position: { x: number; y: number }
  ) => {
    setModalTitle(title);
    setModalEntity(entity);
    setModalPosition(position);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Breadcrumb history={history} onBack={handleBackClick} />
      <div className="flex-grow flex">
        <MainPanel entity={currentEntity} />
        {currentEntity && (
          <RelationsList
            relations={currentEntity.Relations}
            onEntityClick={(entity) => {
              handleEntityClick(entity);
            }}
            onEntityHover={handleEntityHover}
          />
        )}
      </div>
      {modalEntity && (
        <EntityModal
          title={modalTitle}
          entity={modalEntity}
          position={modalPosition}
          onClose={() => setModalEntity(null)}
        />
      )}
    </div>
  );
};

export default EntityExplorer;
