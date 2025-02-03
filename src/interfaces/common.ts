export interface VehicleTechnicalDetails {
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

export interface VehiclePersonDetails {
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

export interface PersonDetails {
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
  Antecedentes: Antecedentes;
}

export interface Antecedentes {
  Transito: string;
  Felcc: string;
  Felcn: string;
}

export interface Vehicles {
  Fotografia: string;
  id: string;
  status: string;
  mensaje: string;
  existe_data: boolean;
  existe_itv: boolean;
  datos_tecnicos: VehicleTechnicalDetails;
  personas: VehiclePersonDetails[];
}

export interface ApiResponse {
  vehicles: Vehicles;
  person: PersonDetails;
}
