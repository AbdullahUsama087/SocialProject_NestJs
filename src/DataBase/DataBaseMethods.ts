import { Injectable } from '@nestjs/common';

@Injectable()
class DataBaseMethods {
  constructor() {}

  async createDocument(model: any, data: object) {
    const document = await model.create(data);
    return document;
  }

  async findOneDocument(model: any, condition: object) {
    const document = await model.findOne(condition);
    // .populate([{
    //     path:'userId'
    // }]);
    return document;
  }

  async saveDocument(model: any, data: object) {
    const newDoc = new model(data);
    console.log(newDoc);

    const document = await newDoc.save();
    return document;
  }
}

export { DataBaseMethods };
