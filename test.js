import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const MONGO_URI = "mongodb+srv://keshukumar_db_user:nesco123@cluster0.wej15kw.mongodb.net/nesco?retryWrites=true&w=majority&appName=Cluster0";
const COLLECTION_NAME = "sebis";

function cleanAndRebuild(value, path = "root") {

  // ARRAY → every item must have _id
  if (Array.isArray(value)) {
    console.log(`📂 Array → ${path}`);

    return value.map((item, index) => {
      const itemPath = `${path}[${index}]`;

      if (item && typeof item === "object") {
        if (item._id) {
          console.log(`🧹 Removing wrong _id at ${itemPath}`);
          delete item._id;
        }

        item._id = new ObjectId();
        console.log(`🆔 New _id at ${itemPath}`);

        Object.keys(item).forEach(key => {
          item[key] = cleanAndRebuild(item[key], `${itemPath}.${key}`);
        });
      }

      return item;
    });
  }

  // OBJECT → clean nested plain objects
  if (
    value &&
    typeof value === "object" &&
    !(value instanceof ObjectId) &&
    !(value instanceof Date)
  ) {
    // 🚨 CRITICAL: never remove root _id
    if (value._id && path !== "root") {
      console.log(`🚫 Removing illegal _id at ${path}`);
      delete value._id;
    }

    Object.keys(value).forEach(key => {
      value[key] = cleanAndRebuild(value[key], `${path}.${key}`);
    });
  }

  return value;
}

async function migrate() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");

  const collection = mongoose.connection.db.collection(COLLECTION_NAME);
  const cursor = collection.find({});

  let count = 0;

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    count++;

    console.log("\n==============================");
    console.log(`📄 Document #${count}`);
    console.log(`🆔 Root _id → ${doc._id}`);
    console.log("==============================");

    cleanAndRebuild(doc);

    await collection.updateOne(
      { _id: doc._id },
      { $set: doc }
    );

    console.log(`💾 Fixed document → ${doc._id}`);
  }

  console.log("\n🎉 ALL NESTED IDS FIXED CORRECTLY");
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
