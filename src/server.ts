import app from "./app";
import { dataSource } from "./database/data-source";

// -----------------------------------------------------------------------------

const PORT = 3000;

dataSource
   .initialize()
   .then(() => {
      console.log(`🛢️  Data source initialized`);
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
   })
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
