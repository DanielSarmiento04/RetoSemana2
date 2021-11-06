import {Entity, model, property, hasOne} from '@loopback/repository';
import {Pieza} from './pieza.model';

@model()
export class Mecanismo extends Entity {
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
  peso: string;

  @hasOne(() => Pieza)
  pieza: Pieza;

  constructor(data?: Partial<Mecanismo>) {
    super(data);
  }
}

export interface MecanismoRelations {
  // describe navigational properties here
}

export type MecanismoWithRelations = Mecanismo & MecanismoRelations;
