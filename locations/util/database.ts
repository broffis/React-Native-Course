import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                        id INTEGER PRIMARY KEY NOT NULL,
                        title TEXT NOT NULL,
                        imageUri TEXT NOT NULL,
                        address TEXT NOT NULL,
                        lat REAL NOT NULL,
                        lng REAL NOT NULL
                    )`,
        [],
        () => {
          void resolve(true);
        },
        (_, error) => {
          void reject(error);
          return false;
        }
      );
    });
  });
};

export const insertPlace = (place: Place): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO places (title, imageUri, address, lat, lng)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          place.title,
          place.imageUri,
          place.location.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          void resolve(true);
        },
        (_, error) => {
          void reject(error);
          return false;
        }
      );
    });
  });
};

export const fetchPlaces = (): Promise<Place[]> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM places
        `,
        [],
        (_: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
          const places = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id.toString()
              )
            );
          }
          resolve(places);
        },
        (_: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error);
          void reject(error);
          return false;
        }
      );
    });
  });
};

export const fetchPlace = (id: string): Promise<Place> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          if (result.rows.length === 0) {
            void reject("No place found!");
            return false;
          }
          const dp = result.rows.item(0);
          // const dp = result.rows._array[0]
          const place = new Place(
            dp.title,
            dp.imageUri,
            {
              address: dp.address,
              lat: dp.lat,
              lng: dp.lng,
            },
            dp.id.toString()
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
