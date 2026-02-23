export type ArchitectureField = string | string[];

export type ArchitectureType = {
  frontend?: ArchitectureField;
  dataSources?: ArchitectureField;
  backend?: ArchitectureField;
  search?: ArchitectureField;
  seo?: ArchitectureField;
  hosting?: ArchitectureField;
};

export const formatArchitectureValue = (value: ArchitectureField): string =>
  Array.isArray(value) ? value.join(', ') : value;
