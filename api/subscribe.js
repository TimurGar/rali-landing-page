import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  console.log("Someone called my API!");

    console.log("MongoDB URI:", process.env.MONGODB_CONNECTION_STRING);
  
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
    await client.connect();

    // Create/access database and collection
    const db = client.db("Rali");
    const collection = db.collection("proscpects");

    const existingUser = await collection.findOne({ email: email });

    // user already exists
    if (existingUser) {
      await client.close();
      return res.status(409).json({
        message: "Email already subscribed!",
      });
    }

    // Save the email
    await collection.insertOne({
      email: email,
      subscribedAt: new Date(),
    });

    await client.close();

    res.status(200).json({
      message: "Successfully subscribed!",
      email: email,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
