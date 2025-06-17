import mongoose from "mongoose";
declare global {
  var mongoose: any;
}

const args = {
  bufferCommands: false,
}

let cached = global.mongoose;

if (!cached)
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };

export default async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI!;
  if (!MONGODB_URI) throw new Error("MongoDB URI is missing!");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, args).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
