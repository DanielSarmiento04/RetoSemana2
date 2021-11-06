import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Maquina, MaquinaRelations, Pieza} from '../models';
import {PiezaRepository} from './pieza.repository';

export class MaquinaRepository extends DefaultCrudRepository<
  Maquina,
  typeof Maquina.prototype.id,
  MaquinaRelations
> {

  public readonly piezas: HasManyRepositoryFactory<Pieza, typeof Maquina.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PiezaRepository') protected piezaRepositoryGetter: Getter<PiezaRepository>,
  ) {
    super(Maquina, dataSource);
    this.piezas = this.createHasManyRepositoryFactoryFor('piezas', piezaRepositoryGetter,);
    this.registerInclusionResolver('piezas', this.piezas.inclusionResolver);
  }
}
