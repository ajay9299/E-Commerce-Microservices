import { log } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";

class Jwt {
  private static instance: Jwt;
  public static jwtKey = "this_is_secret_key";

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): Jwt {
    if (!Jwt.instance) {
      Jwt.instance = new Jwt();
    }
    return Jwt.instance;
  }

  /**
   * @param sellerPayload this is basic information that assign inside token payload
   * @return jwt token
   * */
  public async jwtTokenGenerator(sellerPayload: any): Promise<string> {
    return jwt.sign(sellerPayload, Jwt.jwtKey);
  }
  /**
   * @param jwtToken jwt token.
   * @return decode information of token
   * */
  public async jwtDecoder(jwtToken: string): Promise<string | JwtPayload> {
    return jwt.verify(jwtToken, Jwt.jwtKey);
  }
}

export default Jwt.getInstance();
