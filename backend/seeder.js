import * as dotenv from "dotenv";
import User from "./models/UserModel.js";
import users from "./_data/users.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Data imported...");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else {
  destroyData();
}
