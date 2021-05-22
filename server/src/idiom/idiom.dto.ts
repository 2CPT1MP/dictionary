export class AddIdiomDto {
  idiom: string;
  definition: string;
  keywords: string[];
  category: string;
  source: string;
  field: string;
  quote: string;
}

export class UpdateIdiomDto {
  idiom: string;
  definition: string;
  keywords: string[];
  category: string;
  source: string;
  field: string;
  quote: string;
}
