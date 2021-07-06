import { Connection, createConnection, getConnection } from "typeorm";
import ormconfig from "../../ormconfig";

const DBConnect = async () => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  }
  catch (e) {
    console.log(e)
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      console.log("entered Else...");

      await createConnection(ormconfig);
    }
    console.log("🌴 Database connection was successful!");
  } catch (e) {
    console.error("ERROR: Database connection failed!!", e);
    throw e;
  }
};

export const TryDBConnect = async (onError: Function, next?: Function) => {
  try {
    await DBConnect();
    if (next) {
      next();
    }

  } catch (e) {
    console.log(e);
  }
};
