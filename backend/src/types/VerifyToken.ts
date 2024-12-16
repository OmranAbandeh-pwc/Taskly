import { Request } from "express"
interface IDecode {
    address: string,
    role: string,
    iat: number,
    exp: number
  };
  
  export default interface RequestWithUserRole extends Request {
    userid?: IDecode,
  }