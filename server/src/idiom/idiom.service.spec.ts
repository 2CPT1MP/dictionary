import { Test, TestingModule } from '@nestjs/testing';
import { IdiomService } from './idiom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idiom, IdiomSchema } from './idiom.schema';

describe('IdiomService', () => {
  let service: IdiomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/dictionary'),
        MongooseModule.forFeature([{ name: Idiom.name, schema: IdiomSchema }]),
      ],
      providers: [IdiomService],
    }).compile();

    service = module.get<IdiomService>(IdiomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have some idioms with body and description defined', async () => {
    const idioms = await service.getAllIdioms();
    expect(idioms.length).toBeGreaterThan(0);

    idioms.forEach((idiom) => {
      expect(idiom.idiom.length).toBeGreaterThan(3);
      expect(idiom.definition.length).toBeGreaterThan(3);
      expect(idiom.likes).toBeDefined();
      expect(idiom.approved).toBeDefined();
    });
  });

  it('should find idiom with provided id', async () => {
    const id = '60a92b02ce05ed0e4c260026';
    const idiom = await service.getIdiomById(id);

    expect(idiom.idiom.length).toBeGreaterThan(3);
    expect(idiom.definition.length).toBeGreaterThan(3);
    expect(idiom.likes).toBeDefined();
    expect(idiom.approved).toBeDefined();
  });
});
