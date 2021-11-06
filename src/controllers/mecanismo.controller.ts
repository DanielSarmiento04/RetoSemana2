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
import {Mecanismo} from '../models';
import {MecanismoRepository} from '../repositories';

export class MecanismoController {
  constructor(
    @repository(MecanismoRepository)
    public mecanismoRepository : MecanismoRepository,
  ) {}

  @post('/mecanismos')
  @response(200, {
    description: 'Mecanismo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mecanismo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanismo, {
            title: 'NewMecanismo',
            exclude: ['id'],
          }),
        },
      },
    })
    mecanismo: Omit<Mecanismo, 'id'>,
  ): Promise<Mecanismo> {
    return this.mecanismoRepository.create(mecanismo);
  }

  @get('/mecanismos/count')
  @response(200, {
    description: 'Mecanismo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mecanismo) where?: Where<Mecanismo>,
  ): Promise<Count> {
    return this.mecanismoRepository.count(where);
  }

  @get('/mecanismos')
  @response(200, {
    description: 'Array of Mecanismo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mecanismo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mecanismo) filter?: Filter<Mecanismo>,
  ): Promise<Mecanismo[]> {
    return this.mecanismoRepository.find(filter);
  }

  @patch('/mecanismos')
  @response(200, {
    description: 'Mecanismo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanismo, {partial: true}),
        },
      },
    })
    mecanismo: Mecanismo,
    @param.where(Mecanismo) where?: Where<Mecanismo>,
  ): Promise<Count> {
    return this.mecanismoRepository.updateAll(mecanismo, where);
  }

  @get('/mecanismos/{id}')
  @response(200, {
    description: 'Mecanismo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mecanismo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mecanismo, {exclude: 'where'}) filter?: FilterExcludingWhere<Mecanismo>
  ): Promise<Mecanismo> {
    return this.mecanismoRepository.findById(id, filter);
  }

  @patch('/mecanismos/{id}')
  @response(204, {
    description: 'Mecanismo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanismo, {partial: true}),
        },
      },
    })
    mecanismo: Mecanismo,
  ): Promise<void> {
    await this.mecanismoRepository.updateById(id, mecanismo);
  }

  @put('/mecanismos/{id}')
  @response(204, {
    description: 'Mecanismo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mecanismo: Mecanismo,
  ): Promise<void> {
    await this.mecanismoRepository.replaceById(id, mecanismo);
  }

  @del('/mecanismos/{id}')
  @response(204, {
    description: 'Mecanismo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mecanismoRepository.deleteById(id);
  }
}
