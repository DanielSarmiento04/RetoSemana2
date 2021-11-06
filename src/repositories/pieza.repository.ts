import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pieza, PiezaRelations} from '../models';

export class PiezaRepository extends DefaultCrudRepository<
  Pieza,
  typeof Pieza.prototype.id,
  PiezaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Pieza, dataSource);
  }
}
