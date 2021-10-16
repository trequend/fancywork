import { Schema } from '../types';

export function downloadSchema(schema: Schema) {
  const blob = new Blob([JSON.stringify(schema)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.download = `${schema.metadata.name}.json`;
  anchor.href = url;
  anchor.onclick = () => {
    setImmediate(() => {
      URL.revokeObjectURL(url);
    });
  };

  anchor.click();
  anchor.remove();
}