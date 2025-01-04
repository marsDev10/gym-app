import { ObjectId } from "mongodb";
declare global {
  namespace Express {
    interface Request {
      _id?: ObjectId;
      email?: string;
      name?: string;
    }
  }
}
