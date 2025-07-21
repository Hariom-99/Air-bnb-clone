const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/air_bnb_db";
mongoose.connect(url);

const listingSchema = new mongoose.Schema({}, { strict: false });
const List = mongoose.model("list", listingSchema);

async function addDescriptionField() {
  try {
    const result = await List.updateMany(
      { description: { $exists: false } },
      { $set: { description: "No description provided yet." } }
    );
    console.log("✅ Descriptions added:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

addDescriptionField();
