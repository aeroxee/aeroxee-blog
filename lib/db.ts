import { MongoClient, ServerApiVersion } from "mongodb";

const ClientDB = new MongoClient(`${process.env.MONGO_URL}`, {
  serverApi: ServerApiVersion.v1,
});

export { ClientDB };
