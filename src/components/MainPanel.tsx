import { DetailsItv, DetailsSegip } from "../api/types";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Assuming shadcn-ui is installed and has a Table component

type MainPanelProps = {
  entity: DetailsSegip | DetailsItv | null;
};

const MainPanel: React.FC<MainPanelProps> = ({ entity }) => {

  if (!entity) {
    return (
      <div className="flex-grow p-8 text-gray-400">
        Select an entity to view details.
      </div>
    );
  }

  const isDetailsSegip = (
    entity: DetailsSegip | DetailsItv
  ): entity is DetailsSegip => "Antecedentes" in entity;

  const isDetailsItv = (
    entity: DetailsSegip | DetailsItv
  ): entity is DetailsItv => "datos_tecnicos" in entity;

  return (
    <div className="flex-grow px-4 py-2 bg-gray-800 rounded-lg">
      {isDetailsSegip(entity) && (
        <h2 className="text-3xl font-bold mb-8">{entity.Nombres + ' ' + entity.PrimerApellido + ' ' + entity.SegundoApellido}</h2>
      )}
      {isDetailsItv(entity) && (
        <h2 className="text-3xl font-bold mb-8">{entity.datos_tecnicos.marca + ' ' + entity.datos_tecnicos.modelo}</h2>
      )}
      <div className="flex items-start mb-4">
        <div className="w-1/5">
          <h3 className="font-bold text-xl mb-4">Fotografía</h3>
          <img
            src={`data:image/jpeg;base64,${entity.Fotografia}`}
            alt="Fotografía"
            className="w-[200px] h-[200px] object-contain mx-auto"
          />
        </div>
        <div className="w-4/5 pl-8">
          {isDetailsSegip(entity) && entity.Antecedentes && (
            <>
              <h3 className="font-bold text-xl mb-4">Entity Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(entity).map(([key, value]) => {
                    if (
                      key === "Fotografia" ||
                      key === "Antecedentes" ||
                      key === "Relations"
                    )
                      return null;

                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{String(value)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <h3 className="font-semibold text-lg mb-4 pt-4">Antecedentes</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(entity.Antecedentes).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{String(value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          {isDetailsItv(entity) && entity.datos_tecnicos && (
            <>
              <h3 className="font-semibold text-lg mb-4">Technical Data</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(entity.datos_tecnicos).map(([key, value]) => {
                    if (key === "Fotografia") return null;

                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{String(value)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
