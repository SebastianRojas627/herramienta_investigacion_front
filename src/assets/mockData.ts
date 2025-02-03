export const MOCK_DATA = {
    id: "1",
    type: "person",
    name: "John Doe",
    details: {
      ID: "123456789",
      Age: "45",
      Occupation: "Detective",
      Address: "221B Baker Street",
    },
    relations: {
      parents: [
        { id: "2", name: "Jane Doe", type: "person" },
        { id: "3", name: "James Doe", type: "person" },
      ],
      spouse: { id: "4", name: "Mary Doe", type: "person" },
      vehicles: [
        { id: "5", name: "Ford Mustang", type: "vehicle" },
        { id: "6", name: "Harley Davidson", type: "vehicle" },
      ],
    },
  };
  
  // Extended data for lazy-loading demonstration
  export const EXTENDED_DATA = {
    "2": {
      id: "2",
      type: "person",
      name: "Jane Doe",
      details: {
        ID: "234567890",
        Age: "70",
        Occupation: "Retired Teacher",
        Address: "456 Elm Street",
      },
      relations: {
        parents: [],
        spouse: { id: "3", name: "James Doe", type: "person" },
        vehicles: [],
      },
    },
    "3": {
      id: "3",
      type: "person",
      name: "James Doe",
      details: {
        ID: "345678901",
        Age: "72",
        Occupation: "Retired Police Officer",
        Address: "456 Elm Street",
      },
      relations: {
        parents: [],
        spouse: { id: "2", name: "Jane Doe", type: "person" },
        vehicles: [{ id: "7", name: "Chevrolet Impala", type: "vehicle" }],
      },
    },
    "4": {
      id: "4",
      type: "person",
      name: "Mary Doe",
      details: {
        ID: "456789012",
        Age: "42",
        Occupation: "Lawyer",
        Address: "789 Pine Avenue",
      },
      relations: {
        parents: [],
        spouse: { id: "1", name: "John Doe", type: "person" },
        vehicles: [],
      },
    },
    "5": {
      id: "5",
      type: "vehicle",
      name: "Ford Mustang",
      details: {
        LicensePlate: "ABC123",
        Model: "2019",
        Color: "Red",
        Owner: "John Doe",
      },
      relations: {
        owners: [{ id: "1", name: "John Doe", type: "person" }],
      },
    },
    "6": {
      id: "6",
      type: "vehicle",
      name: "Harley Davidson",
      details: {
        LicensePlate: "XYZ789",
        Model: "2020",
        Color: "Black",
        Owner: "John Doe",
      },
      relations: {
        owners: [{ id: "1", name: "John Doe", type: "person" }],
      },
    },
    "7": {
      id: "7",
      type: "vehicle",
      name: "Chevrolet Impala",
      details: {
        LicensePlate: "DEF456",
        Model: "1967",
        Color: "Black",
        Owner: "James Doe",
      },
      relations: {
        owners: [{ id: "3", name: "James Doe", type: "person" }],
      },
    },
  };
  