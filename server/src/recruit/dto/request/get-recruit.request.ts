import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";
export class GetRecruitDto {
    @IsOptional()
    @IsString()
    private query?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private hour?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private dist?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private maxLen?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private minLen?: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    private title?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    private author?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    private avail?: boolean;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private pageSize?: number;

    getQuery(): string | undefined {
        return this.query;
    }

    getHour(): number | undefined {
        return this.hour;
    }

    getDist(): number | undefined {
        return this.dist;
    }

    getMaxLength(): number | undefined {
        return this.maxLen;
    }

    getMinLength(): number | undefined {
        return this.minLen;
    }

    getTitle(): boolean {
        if (this.title === false) {
            return false;
        }
        return true;
    }

    getAuthor(): boolean {
        if (this.author === false) {
            return false;
        }
        return true;
    }

    getAvail(): boolean {
        return this.avail;
    }

    getPage(): number {
        return this.page || 1;
    }

    getPageSize(): number {
        return this.pageSize || 10;
    }
}
