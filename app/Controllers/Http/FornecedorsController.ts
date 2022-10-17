import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fornecedor from 'App/Models/Fornecedor'

export default class FornecedorsController {
  public async index({ response }: HttpContextContract) {
    const allFornecedor = await Fornecedor.all()

    return response.ok(allFornecedor)
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, tipo, cnpj } = request.all()

    const data = {
      nome: nome,
      tipo: tipo,
      cnpj: cnpj,
    }

    await Fornecedor.create(data)

    return response.ok({ mensagem: 'Fornecedor criado com sucesso' })
  }

  public async show({ params, response }: HttpContextContract) {
    let id = params.id

    const fornecedor = await Fornecedor.findBy('id', id)

    if (!fornecedor) {
      return response.badRequest({ mensagem: 'Fornecedor nao localizado' })
    }

    await fornecedor.load('Produtos')

    return response.ok(fornecedor)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { nome, tipo, cnpj } = await request.all()

    const data = {
      nome: nome,
      tipo: tipo,
      cnpj: cnpj,
    }

    let id = params.id
    const fornecedor = await Fornecedor.findBy('id', id)

    if (!fornecedor) {
      return response.badRequest({ mensagem: 'Fornecedor nao localizado' })
    }

    fornecedor.merge(data)

    await fornecedor.save()

    return response.ok({ mensagem: 'Fornecedor atualizado com sucesso' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    let id = params.id
    const fornecedor = await Fornecedor.findBy('id', id)

    if (!fornecedor) {
      return response.badRequest({ mensagem: 'Fornecedor nao localizado' })
    }

    await fornecedor.delete()

    return response.ok({ mensagem: 'Fornecedor Deletado com sucesso' })
  }
}
