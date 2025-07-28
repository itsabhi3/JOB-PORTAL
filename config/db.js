import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
   console.log(
     `✅ Connected to MongoDB Database: ${mongoose.connection.host}`.bgMagenta
       
   );

  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
     process.exit(1);
  }
};

export default connectDB;
