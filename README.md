# Conpass

- ## Descrição

  - Teste para o processo seletivo da Conpass

- ## Ambiente

  - Node - v10.15.0
  - MongoDB v4.0.10

- ## Banco

  - A configuração do banco se encontra no arquivo: [Database](src/config/index.js).
  - Atual configuração está como se a instancia do banco estivesse rodando na mesma máquina. Caso contrário, pode ser passado uma variavel `MONGO_PATH`

- ## Postman:

  - Caso queira, é possível fazer o [download](Conpass.postman_collection.json) do json para importar os exemplos de request no Postman.

- ## Testes:

  - O projeto conta com alguns testes. Na raiz do projeto, após instalar as dependências, basta executar o comento `npm test`.

* ## Rodando o projeto

  - Rodar o `npm install` para baixar as dependências do projeto.
  - E o comando `npm start` para subir o projeto.

- ## Observações:

  - O teste pedia para deixar como required owner na company e company no user. Com isso, não seria possível iniciar os cadastros, então optei por não deixar owner, na entidade company, como required. 
  - Como os planos são pré-cadastrados, rodar o post que existe no postman para criá-los.
  - A subscription, criada após a empresa, tem como default o status `Trial` e seu vencimento para uma semana após seu cadastrado.
  - Foi implementado o `JWT` no projeto porém não foi adicionado seu middleware nas rotas de Api's por não saber os níveis de acesso. Caso queira, existe um exemplo do request no [arquivo para importar no postman](Conpass.postman_collection.json) e seu [middleware](src/middleware/verifyToken.js).