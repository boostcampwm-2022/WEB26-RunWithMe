import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  private _id: string;

  @IsEmail()
  private _email: string;

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get email() {
    return this._email;
  }
}
