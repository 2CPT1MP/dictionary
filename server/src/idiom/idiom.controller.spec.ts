import { Test, TestingModule } from '@nestjs/testing';
import { IdiomController } from './idiom.controller';
import { IdiomModule } from './idiom.module';

describe('IdiomController', () => {
  let controller: IdiomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdiomModule],
      controllers: [IdiomController, IdiomModule],
    }).compile();

    controller = module.get<IdiomController>(IdiomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
