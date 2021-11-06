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
import {Pieza} from '../models';
import {PiezaRepository} from '../repositories';

export class PiezaController {
  constructor(
    @repository(PiezaRepository)
    public piezaRepository : PiezaRepository,
  ) {}

  @post('/piezas')
  @response(200, {
    description: 'Pieza model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pieza)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {
            title: 'NewPieza',
            exclude: ['id'],
          }),
        },
      },
    })
    pieza: Omit<Pieza, 'id'>,
  ): Promise<Pieza> {
    return this.piezaRepository.create(pieza);
  }

  @get('/piezas/count')
  @response(200, {
    description: 'Pieza model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pieza) where?: Where<Pieza>,
  ): Promise<Count> {
    return this.piezaRepository.count(where);
  }

  @get('/piezas')
  @response(200, {
    description: 'Array of Pieza model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pieza, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pieza) filter?: Filter<Pieza>,
  ): Promise<Pieza[]> {
    return this.piezaRepository.find(filter);
  }

  @patch('/piezas')
  @response(200, {
    description: 'Pieza PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {partial: true}),
        },
      },
    })
    pieza: Pieza,
    @param.where(Pieza) where?: Where<Pieza>,
  ): Promise<Count> {
    return this.piezaRepository.updateAll(pieza, where);
  }

  @get('/piezas/{id}')
  @response(200, {
    description: 'Pieza model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pieza, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pieza, {exclude: 'where'}) filter?: FilterExcludingWhere<Pieza>
  ): Promise<Pieza> {
    return this.piezaRepository.findById(id, filter);
  }

  @patch('/piezas/{id}')
  @response(204, {
    description: 'Pieza PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {partial: true}),
        },
      },
    })
    pieza: Pieza,
  ): Promise<void> {
    await this.piezaRepository.updateById(id, pieza);
  }

  @put('/piezas/{id}')
  @response(204, {
    description: 'Pieza PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pieza: Pieza,
  ): Promise<void> {
    await this.piezaRepository.replaceById(id, pieza);
  }

  @del('/piezas/{id}')
  @response(204, {
    description: 'Pieza DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.piezaRepository.deleteById(id);
  }
}
