import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mecanismo, MecanismoRelations, Pieza} from '../models';
import {PiezaRepository} from './pieza.repository';

export class MecanismoRepository extends DefaultCrudRepository<
  Mecanismo,
  typeof Mecanismo.prototype.id,
  MecanismoRelations
> {

  public readonly pieza: HasOneRepositoryFactory<Pieza, typeof Mecanismo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PiezaRepository') protected piezaRepositoryGetter: Getter<PiezaRepository>,
  ) {
    super(Mecanismo, dataSource);
    this.pieza = this.createHasOneRepositoryFactoryFor('pieza', piezaRepositoryGetter);
    this.registerInclusionResolver('pieza', this.pieza.inclusionResolver);
  }
}
