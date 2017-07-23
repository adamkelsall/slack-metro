import * as fs from "fs";
import * as path from "path";

export interface PersistedData {
  disruptions: number;
}

export function readPersistedData(): Promise<PersistedData> {
  return new Promise((resolve, reject) => {
    fs.readFile(persistedFile(), (err, data) => {
      if (err) {
        const defaultData: PersistedData = {
          disruptions: 0,
        };

        return /ENOENT/.test(err.message) ? resolve(defaultData) : reject(err);
      }

      try {
        resolve(JSON.parse(data.toString()));
      } catch (err) {
        reject(err);
      }
    });
  });
}

export function writePersistedData(data: PersistedData): Promise<void> {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFile(persistedFile(), dataString, (err) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

function persistedFile(): string {
  return path.join(".", "persisted.json");
}
