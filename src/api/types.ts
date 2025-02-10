export interface SearchSegip {
  pat: string;
  mat: string;
  nom: string;
  ced: string;
  com: string;
}

export interface SearchItv {
  placa: string;
}

export interface ListSegip {
  Fotografia: string;
  PrimerApellido: string;
  SegundoApellido: string;
  Nombres: string;
  NumeroDocumento: string;
  Domicilio: string;
  Antecedentes: AntecedentesPersona;
}

interface ListDatosTecnicosItv {
  placa: string;
  marca: string;
  modelo: string;
  color: string;
}

export interface ListItv {
  Fotografia: string;
  datos_tecnicos: ListDatosTecnicosItv;
}

export interface AntecedentesPersona {
  Transito: string;
  Felcc: string;
  Felcn: string;
}

interface DetailsDatosTecnicosItv {
  placa: string;
  marca: string;
  modelo: string;
  industria: string;
  clase: string;
  servicio: string;
  tipo_vehiculo: string;
  color: string;
  cilindrada: number;
  chasis: string;
  motor: string;
  radicatoria: string;
}

export interface DetailsOwnerItv {
  gestion: string;
  nombre: string;
  paterno: string;
  materno: string;
  nro_documento: string;
  expedicion: string;
  domicilio: string;
  fecha_nacimiento: string;
  sexo: string;
  nro_celular: string;
  email: string;
  categoria_licencia: string;
  documento_complemento: string;
}

export interface DetailsItv {
  Fotografia: string;
  id: string;
  status: string;
  mensaje: string;
  existe_data: boolean;
  existe_itv: boolean;
  datos_tecnicos: DetailsDatosTecnicosItv;
  personas: DetailsOwnerItv[];
  Relations: {
    personas: ListSegip[];
  };
}

export interface DetailsSegip {
  Fotografia: string;
  id: string;
  Complemento: string;
  Domicilio: string;
  EstadoCivil: string;
  FechaNacimiento: string;
  LugarNacimientoDepartamento: string;
  LugarNacimientoLocalidad: string;
  LugarNacimientoPais: string;
  LugarNacimientoProvincia: string;
  NombreCompletoConyuge: string;
  NombreCompletoMadre: string;
  NombreCompletoPadre: string;
  NumeroDocumento: string;
  ProcedenciaRegistro: string;
  Nombres: string;
  PrimerApellido: string;
  ProfesionOcupacion: string;
  SegundoApellido: string;
  ComplementoVisible: string;
  TipoRegistro: string;
  Genero: string;
  Nacionalidad: string;
  GrupoSanguineo: string;
  LugarExpedicion: string;
  Antecedentes: AntecedentesPersona;
  Relations: {
    padres: ListSegip[];
    hermanos: ListSegip[];
    hijos: ListSegip[];
    conyugue: ListSegip | null;
    vehiculos: ListItv[];
  };
}

export interface Log {
  id: string;
  busqueda: string;
  tipo: string;
  created_at: string;
  user_id: string;
}

export interface UserLog {
  firstName: string;
  lastName: string;
  rank: string;
  email: string;
}
