import { Types } from "mongoose"

export class BasicUserDetails{
    userId !: Types.ObjectId;
    firstName !: string;
    lastName !: string;
    email !: string
}