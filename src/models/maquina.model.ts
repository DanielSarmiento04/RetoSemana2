import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pieza} from './pieza.model';

@model()
export class Maquina extends Entity {
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
  mecanimo: string;

  @property({
    type: 'string',
    required: true,
  })
  pieza: string;

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

  @hasMany(() => Pieza)
  piezas: Pieza[];

  constructor(data?: Partial<Maquina>) {
    super(data);
  }
}

export interface MaquinaRelations {
  // describe navigational properties here
}

export type MaquinaWithRelations = Maquina & MaquinaRelations;
