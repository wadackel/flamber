import { sequelize } from "../src/js/models/";

sequelize.sync({ force: true })
  .then(() => console.log("Done!!"))
  .catch(error => console.error("Error!!", error));
