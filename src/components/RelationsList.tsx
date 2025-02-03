import { DetailsItv, DetailsSegip, ListItv, ListSegip } from "../api/types";

type RelationsListProps = {
  relations: DetailsSegip["Relations"] | DetailsItv["Relations"];
  onEntityClick: (entity: ListSegip | ListItv) => void;
  onEntityHover: (
    title: string,
    entity: ListSegip | ListItv | null,
    position: { x: number; y: number }
  ) => void;
};

const isDetailsSegip = (
  relations: DetailsSegip["Relations"] | DetailsItv["Relations"]
): relations is DetailsSegip["Relations"] => "padres" in relations;

const isDetailsItv = (
  relations: DetailsSegip["Relations"] | DetailsItv["Relations"]
): relations is DetailsItv["Relations"] => "personas" in relations;

const RelationsList: React.FC<RelationsListProps> = ({
  relations,
  onEntityClick,
  onEntityHover,
}) => {
  const renderSegip = (entities: ListSegip[], title: string) => (
    <>
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <ul className="mt-2 space-y-2">
        {entities.length > 0 ? (
          entities.map((entity) => (
            <li key={entity.NumeroDocumento}>
              <div className="group sm:hover:underline sm:cursor-pointer">
                <button
                  className="hover:underline text-blue-400 ml-2"
                  onClick={() => onEntityClick(entity)}
                  onMouseEnter={(e) => {
                    if (window.innerWidth >= 640) {
                      // 640px is the sm breakpoint
                      onEntityHover(title, entity, {
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 640) {
                      onEntityHover("", null, { x: 0, y: 0 });
                    }
                  }}
                >
                  {entity.Nombres + " " + entity.PrimerApellido}
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400 ml-2">No hay resultados</li>
        )}
      </ul>
    </>
  );

  const renderItv = (entities: ListItv[], title: string) => (
    <>
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <ul className="mt-2 space-y-2">
        {entities.length > 0 ? (
          entities.map((entity) => (
            <li key={entity.datos_tecnicos.placa}>
              <button
                className="hover:underline cursor-pointer text-blue-400 ml-2"
                onClick={() => onEntityClick(entity)}
                onMouseEnter={(e) =>
                  onEntityHover(title, entity, { x: e.clientX, y: e.clientY })
                }
                onMouseLeave={() => onEntityHover("", null, { x: 0, y: 0 })}
              >
                {entity.datos_tecnicos.marca +
                  " " +
                  entity.datos_tecnicos.modelo}
              </button>
            </li>
          ))
        ) : (
          <li>No hay resultados</li>
        )}
      </ul>
    </>
  );

  return (
    <div className="w-1/5 bg-gray-700 p-4 rounded-lg overflow-y-auto">
      <h2 className="text-3xl font-bold my-6">Relaciones de Busqueda:</h2>
      {isDetailsSegip(relations) && (
        <>
          {relations.padres && renderSegip(relations.padres, "Padres:")}
          {relations.hermanos && renderSegip(relations.hermanos, "Hermanos:")}
          {relations.hijos && renderSegip(relations.hijos, "Hijos:")}
          {relations.conyugue && renderSegip([relations.conyugue], "Conyuge:")}
          {relations.vehiculos && renderItv(relations.vehiculos, "Vehiculos:")}
        </>
      )}

      {isDetailsItv(relations) && (
        <>{relations.personas && renderSegip(relations.personas, "Dueños")}</>
      )}
    </div>
  );
};

export default RelationsList;
