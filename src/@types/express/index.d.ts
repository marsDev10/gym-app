import { ObjectId } from "mongodb";
import { Privileges } from "../../enums/privileges.enum.ts";
declare global {
  namespace Express {
    interface Request {
      _id?: ObjectId;
      email?: string;
      name?: string;
      privilege?: Privileges;
    }
  }
}
