export type ArchitectureField = { tech: string | null; label: string };

export type ArchitectureType = {
  frontend?: ArchitectureField[];
  dataSources?: ArchitectureField[];
  backend?: ArchitectureField[];
  search?: ArchitectureField[];
  seo?: ArchitectureField[];
  hosting?: ArchitectureField[];
};
