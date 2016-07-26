import { Router } from "express";
import Item from "../../models/item";

const router = Router();

router.get("/", (req, res) => {
  res.errorJSON("TODO");
});

export default Router();
