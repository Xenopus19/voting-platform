import { PORT } from "./src/config";
import app from "./src/app";
import { connectToDatabase } from "./src/util/db";

const main = async () => {
  await connectToDatabase();

  console.log(`Server is running on ${PORT}`);
  app.listen(PORT);
};

main();
