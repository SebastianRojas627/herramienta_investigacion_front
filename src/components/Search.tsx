import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import MainPanel from "./MainPanel";
import RelationsList from "./RelationsList";
import EntityModal from "./EntityModal";

type Entity = {
  id: string;
  type: "person" | "vehicle";
  name: string;
  details: Record<string, string>;
  relations: {
    parents?: Entity[];
    spouse?: Entity;
    vehicles?: Entity[];
    owners?: Entity[];
  };
};

const mockData: Entity = {
  id: "1",
  type: "person",
  name: "John Doe",
  details: {
    ID: "123456789",
    Age: "35",
    Occupation: "Engineer",
    Address: "123 Main Street",
  },
  relations: {
    parents: [
      {
        id: "2",
        type: "person",
        name: "Jane Doe",
        details: { ID: "987654321", Age: "60", Occupation: "Teacher" },
        relations: {},
      },
      {
        id: "3",
        type: "person",
        name: "James Doe",
        details: { ID: "876543210", Age: "65", Occupation: "Retired" },
        relations: {},
      },
    ],
    spouse: {
      id: "4",
      type: "person",
      name: "Mary Doe",
      details: { ID: "135791357", Age: "34", Occupation: "Doctor" },
      relations: {},
    },
    vehicles: [
      {
        id: "5",
        type: "vehicle",
        name: "Toyota Corolla (AB-123-CD)",
        details: {
          Plate: "AB-123-CD",
          Model: "2020",
          Color: "Blue",
        },
        relations: {
          owners: [
            {
              id: "1",
              type: "person",
              name: "John Doe",
              details: { ID: "123456789", Age: "35", Occupation: "Engineer" },
              relations: {},
            },
          ],
        },
      },
    ],
  },
};

const EntityExplorer: React.FC = () => {
  const [currentEntity, setCurrentEntity] = useState<Entity | null>(mockData);
  const [history, setHistory] = useState<Entity[]>([]);
  const [modalEntity, setModalEntity] = useState<Entity | null>(null);

  const handleEntityClick = (entity: Entity) => {
    setHistory((prev) => [...prev, currentEntity!]);
    setCurrentEntity(entity);
  };

  const handleBackClick = () => {
    const previous = history.pop();
    setCurrentEntity(previous || null);
    setHistory([...history]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Breadcrumb history={history} onBack={handleBackClick} />
      <div className="flex-grow flex">
        <MainPanel entity={currentEntity} />
        {currentEntity && (
          <RelationsList
            relations={currentEntity.relations}
            onEntityClick={handleEntityClick}
            onEntityHover={setModalEntity}
          />
        )}
      </div>
      {modalEntity && (
        <EntityModal entity={modalEntity} onClose={() => setModalEntity(null)} />
      )}
    </div>
  );
};

export default EntityExplorer;
