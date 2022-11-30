import { ApiProperty } from "@nestjs/swagger";
import { ResponseStatus } from "src/common/response/response.status";
import { Exclude, Expose } from "class-transformer";

export class ResponseEntity {
    @Exclude() private readonly _statusCode: number;
    @Exclude() private readonly _data?: any;
    @Exclude() private readonly _error?: string;
    @Exclude() private readonly _message?: string;

    private constructor(status: ResponseStatus);
    private constructor(status: ResponseStatus, data: any);
    private constructor(status: ResponseStatus, data: any, error: string, message: string);
    private constructor(status?: ResponseStatus, data?: any, error?: string, message?: string) {
        this._statusCode = status;
        this._data = Array.isArray(data) ? [...data] : typeof data === "object" ? { ...data } : undefined;
        this._error = error;
        this._message = message;
    }

    static OK(): ResponseEntity {
        return new ResponseEntity(ResponseStatus.OK);
    }

    static OK_WITH_DATA(data: any): ResponseEntity {
        return new ResponseEntity(ResponseStatus.OK, data);
    }

    static CREATED(): ResponseEntity {
        return new ResponseEntity(ResponseStatus.CREATED);
    }

    static CREATED_WITH_DATA(data: any): ResponseEntity {
        return new ResponseEntity(ResponseStatus.CREATED, data);
    }

    static BAD_REQUEST(message: string): ResponseEntity {
        return new ResponseEntity(ResponseStatus.BAD_REQUEST, undefined, "Bad Request", message);
    }

    static UNAUTHORIZED(message = "로그인이 필요한 서비스입니다"): ResponseEntity {
        return new ResponseEntity(ResponseStatus.UNAUTHORIZED, undefined, "UnAuthorized", message);
    }

    static NOT_FOUND(message: string): ResponseEntity {
        return new ResponseEntity(ResponseStatus.NOT_FOUND, undefined, "Not Found", message);
    }

    static LOCKED(message: string): ResponseEntity {
        return new ResponseEntity(ResponseStatus.LOCKED, undefined, "Locked", message);
    }

    @ApiProperty()
    @Expose()
    get statusCode(): number {
        return this._statusCode;
    }

    @ApiProperty()
    @Expose()
    get data(): any {
        return this._data;
    }

    @ApiProperty()
    @Expose()
    get error(): string {
        return this._error;
    }

    @ApiProperty()
    @Expose()
    get message(): string {
        return this._message;
    }
}
