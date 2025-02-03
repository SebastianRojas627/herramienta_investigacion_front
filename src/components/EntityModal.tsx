import { ListItv, ListSegip } from "../api/types";

type EntityModalProps = {
  title: string;
  entity: ListSegip | ListItv;
  position: { x: number; y: number };
  onClose: () => void;
};

const isListSegip = (entity: ListSegip | ListItv): entity is ListSegip =>
  "NumeroDocumento" in entity;

const isListItv = (entity: ListSegip | ListItv): entity is ListItv =>
  "datos_tecnicos" in entity;

const EntityModal: React.FC<EntityModalProps> = ({
  title,
  entity,
  position,
  onClose,
}) => (
  <div
    className="absolute text-white p-4 rounded-lg shadow-lg"
    style={{
      top: position.y + 10,
      left: position.x + 10,
      zIndex: 50,
    }}
    onMouseLeave={onClose}
  >
    <div className="bg-white p-6 rounded-lg shadow-lg  text-gray-900">
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {isListSegip(entity) &&
          Object.entries(entity).map(([key, value]) => {
            if (key === "Fotografia" || key === "Antecedentes") return null;
            return (
              <li key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </li>
            );
          })}

        {isListItv(entity) &&
          Object.entries(entity.datos_tecnicos).map(([key, value]) => {
            if (key === "Fotografia") return null;
            return (
              <li key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </li>
            );
          })}
      </ul>
    </div>
  </div>
);

export default EntityModal;
