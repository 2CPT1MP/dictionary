import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idiom, IdiomDocument } from './idiom.schema';
import { AddIdiomDto, UpdateIdiomDto } from './idiom.dto';

@Injectable()
export class IdiomService {
  constructor(
    @InjectModel(Idiom.name) private readonly idiomModel: Model<IdiomDocument>,
  ) {}

  async getAllIdioms(): Promise<Idiom[]> {
    return this.idiomModel.find();
  }

  async getIdiomById(id: string): Promise<Idiom> {
    return this.idiomModel.findOne({ _id: id });
  }

  async addIdiom(idiom: AddIdiomDto) {
    const newIdiom = new this.idiomModel(idiom);
    return await newIdiom.save();
  }

  async updateIdiom(idiomId: string, idiom: UpdateIdiomDto) {
    return this.idiomModel.updateOne(
      { _id: idiomId },
      {
        $set: idiom,
      },
    );
  }

  async approveIdiom(idiomId: string) {
    return this.idiomModel.updateOne({ _id: idiomId }, { approved: true });
  }

  async likeIdiom(idiomId: string) {
    const targetIdiom = await this.getIdiomById(idiomId);
    const likeCount = targetIdiom.likes;
    return this.idiomModel.updateOne(
      { _id: idiomId },
      { $set: { likes: likeCount + 1 } },
    );
  }
}
