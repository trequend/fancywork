import { SchemaMetadata } from './SchemaMetadata';

export type WorkMetadata = {
  id: string;
  name: string;
  createdAt: Date;
  lastActivity: Date;
  schemaMetadata: SchemaMetadata;
};
