import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IdiomService } from './idiom.service';
import { AddIdiomDto, UpdateIdiomDto } from './idiom.dto';

@Controller('api/idioms')
export class IdiomController {
  constructor(private readonly idiomService: IdiomService) {}

  @Get()
  async getIdioms() {
    return await this.idiomService.getAllIdioms();
  }

  @Get(':idiomId')
  async getIdiomById(@Param('idiomId') idiomId: string) {
    return await this.idiomService.getIdiomById(idiomId);
  }

  @Post()
  async addIdiom(@Body() idiomBody: AddIdiomDto) {
    return await this.idiomService.addIdiom(idiomBody);
  }

  @Patch(':idiomId')
  async updateIdiom(
    @Param('idiomId') idiomId: string,
    @Body() idiomBody: UpdateIdiomDto,
  ) {
    return await this.idiomService.updateIdiom(idiomId, idiomBody);
  }

  @Post(':idiomId/approve')
  async approveIdiom(@Param('idiomId') idiomId: string) {
    return await this.idiomService.approveIdiom(idiomId);
  }

  @Post(':idiomId/like')
  async likeIdiom(@Param('idiomId') idiomId: string) {
    return await this.idiomService.likeIdiom(idiomId);
  }
}
