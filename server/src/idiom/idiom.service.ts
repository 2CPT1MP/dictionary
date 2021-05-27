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

  async getAllIdioms(filter: string, approved?: boolean): Promise<Idiom[]> {
    if (approved === undefined)
      return this.idiomModel
        .find({
          $or: [
            { idiom: { $regex: new RegExp(filter, 'i') } },
            { definition: { $regex: new RegExp(filter, 'i') } },
          ],
        })
        .sort({ timestamp: -1 })
        .limit(250);
    return this.idiomModel
      .find({
        approved: approved,
        $or: [
          { idiom: new RegExp(filter, 'i') },
          { definition: new RegExp(filter, 'i') },
        ],
      })
      .sort({ timestamp: -1 })
      .limit(250);
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

  async approveIdiom(idiomId: string, approve: boolean) {
    return this.idiomModel.updateOne({ _id: idiomId }, { approved: approve });
  }

  async likeIdiom(idiomId: string, userId: string, like: boolean) {
    if (like) {
      return this.idiomModel.updateOne(
        { _id: idiomId },
        { $addToSet: { likes: userId } },
      );
    }

    return this.idiomModel.updateOne(
      { _id: idiomId },
      { $pullAll: { likes: [userId] } },
    );
  }
}
