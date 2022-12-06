import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";

export class GetCoursesRequestDto {
    @IsOptional()
    @IsString()
    private query?: string;

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
    @Type(() => Number)
    @IsNumber()
    private page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    private pageSize?: number;

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

    getQuery(): string | null {
        return this.query;
    }

    getDist(): number | null {
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

    getPage(): number {
        return this.page || 1;
    }

    getPageSize(): number {
        return this.pageSize || 10;
    }
}
