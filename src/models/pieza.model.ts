import {Entity, model, property} from '@loopback/repository';

@model()
export class Pieza extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  funcionalidad: string;

  @property({
    type: 'string',
    required: true,
  })
  material: string;

  @property({
    type: 'string',
    required: true,
  })
  pElaboracion: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
  })
  mecanismoId?: string;

  @property({
    type: 'string',
  })
  maquinaId?: string;

  constructor(data?: Partial<Pieza>) {
    super(data);
  }
}

export interface PiezaRelations {
  // describe navigational properties here
}

export type PiezaWithRelations = Pieza & PiezaRelations;
