import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'

export default class Fornecedor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public tipo: string

  @column()
  public cnpj: string

  @hasMany(() => Produto, {
    foreignKey: 'id_fornecedor',
  })
  public Produtos: HasMany<typeof Produto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
