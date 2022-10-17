/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fornecedor from 'App/Models/Fornecedor'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async index({ response }: HttpContextContract) {
    const allProdutos = await Produto.all()

    return response.ok(allProdutos)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id_fornecedor, nome, embalagem, valor } = request.all()

    const validFornecedor = await Fornecedor.findBy('id', id_fornecedor)

    if (!validFornecedor) {
      return response.ok({ mensagem: 'Fornecedor náo localizado' })
    }
    const data = {
      id_fornecedor: id_fornecedor,
      nome: nome,
      embalagem: embalagem,
      valor: valor,
    }

    await Produto.create(data)

    return response.ok({ mensagem: 'Produto Criado com sucesso' })
  }

  public async show({ params, response }: HttpContextContract) {
    let id = params.id

    const produto = await Produto.findBy('id', id)

    if (!produto) {
      return response.badRequest({ mensagem: 'produto nao localizado' })
    }

    return response.ok(produto)
  }

  public async update({ params, response, request }: HttpContextContract) {
    let id = params.id
    const { id_fornecedor, nome, embalagem, valor } = request.all()
    const produto = await Produto.findBy('id', id)
    if (!produto) {
      return response.badRequest({ mensagem: 'produto nao localizado' })
    }

    const validFornecedor = await Fornecedor.findBy('id', id_fornecedor)

    if (!validFornecedor) {
      return response.ok({ mensagem: 'Fornecedor náo localizado' })
    }
    const data = {
      id_fornecedor: id_fornecedor,
      nome: nome,
      embalagem: embalagem,
      valor: valor,
    }

    produto.merge(data)

    await produto.save()

    return response.ok({ mensagem: 'Produto atualizado con sucesso' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    let id = params.id

    const produto = await Produto.findBy('id', id)
    if (!produto) {
      return response.badRequest({ mensagem: 'produto nao localizado' })
    }

    await produto.delete()

    return response.ok({ mensagem: 'produto deletado com sucesso' })
  }
}
