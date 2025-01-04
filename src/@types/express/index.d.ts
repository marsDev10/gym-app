/* import { Privileges } from "../../enums/privileges.ts";
 */
declare global {
  namespace Express {
    interface Request {
      email?: string;
      name?: string;
      phoneNumber?: string;
      /* privilege?: Privileges; */
      idCompany?: number;
      idUser?: number;
    }
  }
}
