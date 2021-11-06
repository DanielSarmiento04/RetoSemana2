import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Maquina} from '../models';
import {MaquinaRepository} from '../repositories';

export class MaquinaController {
  constructor(
    @repository(MaquinaRepository)
    public maquinaRepository : MaquinaRepository,
  ) {}

  @post('/maquinas')
  @response(200, {
    description: 'Maquina model instance',
    content: {'application/json': {schema: getModelSchemaRef(Maquina)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maquina, {
            title: 'NewMaquina',
            exclude: ['id'],
          }),
        },
      },
    })
    maquina: Omit<Maquina, 'id'>,
  ): Promise<Maquina> {
    return this.maquinaRepository.create(maquina);
  }

  @get('/maquinas/count')
  @response(200, {
    description: 'Maquina model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Maquina) where?: Where<Maquina>,
  ): Promise<Count> {
    return this.maquinaRepository.count(where);
  }

  @get('/maquinas')
  @response(200, {
    description: 'Array of Maquina model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Maquina, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Maquina) filter?: Filter<Maquina>,
  ): Promise<Maquina[]> {
    return this.maquinaRepository.find(filter);
  }

  @patch('/maquinas')
  @response(200, {
    description: 'Maquina PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maquina, {partial: true}),
        },
      },
    })
    maquina: Maquina,
    @param.where(Maquina) where?: Where<Maquina>,
  ): Promise<Count> {
    return this.maquinaRepository.updateAll(maquina, where);
  }

  @get('/maquinas/{id}')
  @response(200, {
    description: 'Maquina model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Maquina, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maquina, {exclude: 'where'}) filter?: FilterExcludingWhere<Maquina>
  ): Promise<Maquina> {
    return this.maquinaRepository.findById(id, filter);
  }

  @patch('/maquinas/{id}')
  @response(204, {
    description: 'Maquina PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maquina, {partial: true}),
        },
      },
    })
    maquina: Maquina,
  ): Promise<void> {
    await this.maquinaRepository.updateById(id, maquina);
  }

  @put('/maquinas/{id}')
  @response(204, {
    description: 'Maquina PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() maquina: Maquina,
  ): Promise<void> {
    await this.maquinaRepository.replaceById(id, maquina);
  }

  @del('/maquinas/{id}')
  @response(204, {
    description: 'Maquina DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.maquinaRepository.deleteById(id);
  }
}
