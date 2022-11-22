import { Body, Controller, Post } from "@nestjs/common";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { RecruitService } from "./recruit.service";

@Controller("recruit")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @Post()
    async createPost(@Body() createRecruitDto: CreateRecruitDto) {
        return this.recruitService.create(createRecruitDto);
    }
}
