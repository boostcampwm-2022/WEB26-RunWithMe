import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class HDong {
  @IsString()
  private _name: string;

  @Expose()
  get name() {
    return this._name;
  }
}
