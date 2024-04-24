import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
// connection object ko empty isliye raka hu ke connectionObject ka type optional hai.

async function dbConnect(): Promise<void> {
  //dbConnect function Promise ko return kar raha but void ka use hmm isliye kar raha hu ke data kes prakar ka hai. loginka ya signup ka etc.
  if (connection.isConnected) {
    console.log("connected DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("connected DB SUCCESS");
  } catch (error) {
    console.log("connected DB FAILED", error);

    process.exit(1);
  }
}

export default dbConnect;
