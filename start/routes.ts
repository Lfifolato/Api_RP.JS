import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('fornecedor', 'FornecedorsController').apiOnly()

Route.resource('produto', 'ProdutosController').apiOnly()
