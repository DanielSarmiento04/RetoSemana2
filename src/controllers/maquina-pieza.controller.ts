import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Maquina,
  Pieza,
} from '../models';
import {MaquinaRepository} from '../repositories';

export class MaquinaPiezaController {
  constructor(
    @repository(MaquinaRepository) protected maquinaRepository: MaquinaRepository,
  ) { }

  @get('/maquinas/{id}/piezas', {
    responses: {
      '200': {
        description: 'Array of Maquina has many Pieza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pieza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pieza>,
  ): Promise<Pieza[]> {
    return this.maquinaRepository.piezas(id).find(filter);
  }

  @post('/maquinas/{id}/piezas', {
    responses: {
      '200': {
        description: 'Maquina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pieza)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Maquina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {
            title: 'NewPiezaInMaquina',
            exclude: ['id'],
            optional: ['maquinaId']
          }),
        },
      },
    }) pieza: Omit<Pieza, 'id'>,
  ): Promise<Pieza> {
    return this.maquinaRepository.piezas(id).create(pieza);
  }

  @patch('/maquinas/{id}/piezas', {
    responses: {
      '200': {
        description: 'Maquina.Pieza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {partial: true}),
        },
      },
    })
    pieza: Partial<Pieza>,
    @param.query.object('where', getWhereSchemaFor(Pieza)) where?: Where<Pieza>,
  ): Promise<Count> {
    return this.maquinaRepository.piezas(id).patch(pieza, where);
  }

  @del('/maquinas/{id}/piezas', {
    responses: {
      '200': {
        description: 'Maquina.Pieza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pieza)) where?: Where<Pieza>,
  ): Promise<Count> {
    return this.maquinaRepository.piezas(id).delete(where);
  }
}
