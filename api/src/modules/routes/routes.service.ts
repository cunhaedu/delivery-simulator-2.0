import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  findAll(): Promise<Route[]> {
    return this.routeModel.find().exec();
  }
}
