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
  Mecanismo,
  Pieza,
} from '../models';
import {MecanismoRepository} from '../repositories';

export class MecanismoPiezaController {
  constructor(
    @repository(MecanismoRepository) protected mecanismoRepository: MecanismoRepository,
  ) { }

  @get('/mecanismos/{id}/pieza', {
    responses: {
      '200': {
        description: 'Mecanismo has one Pieza',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pieza),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pieza>,
  ): Promise<Pieza> {
    return this.mecanismoRepository.pieza(id).get(filter);
  }

  @post('/mecanismos/{id}/pieza', {
    responses: {
      '200': {
        description: 'Mecanismo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pieza)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanismo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pieza, {
            title: 'NewPiezaInMecanismo',
            exclude: ['id'],
            optional: ['mecanismoId']
          }),
        },
      },
    }) pieza: Omit<Pieza, 'id'>,
  ): Promise<Pieza> {
    return this.mecanismoRepository.pieza(id).create(pieza);
  }

  @patch('/mecanismos/{id}/pieza', {
    responses: {
      '200': {
        description: 'Mecanismo.Pieza PATCH success count',
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
    return this.mecanismoRepository.pieza(id).patch(pieza, where);
  }

  @del('/mecanismos/{id}/pieza', {
    responses: {
      '200': {
        description: 'Mecanismo.Pieza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pieza)) where?: Where<Pieza>,
  ): Promise<Count> {
    return this.mecanismoRepository.pieza(id).delete(where);
  }
}
