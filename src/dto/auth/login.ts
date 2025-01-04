import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Sanitizable } from "../satinizable.dto.js";

export class LoginDto extends Sanitizable {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  sanitize(): void {
    this.sanitizeAll();
  }
}
