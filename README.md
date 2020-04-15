# Teste de API
> Projeto com testes de API utilizando Node.js

Testes sobre API da [Marvel](https://developer.marvel.com/docs#!/public/) utilizando Node.js com framework como [Mocha](https://mochajs.org/) e [Chaijs](https://www.chaijs.com/) com suporte para execução dos testes com [Docker](https://docs.docker.com/).

---

## Pré-requisitos
Ferramentas para uso do projeto conforme a intenção de utilização do mesmo.

* Chaves de acesso API da Marvel
    * Para executar os testes será necessário informar as chaves pública e privada de sua [Conta Marvel](https://developer.marvel.com/documentation/authorization).
    * Nos testes a chave pública e privada serão representadas pelas variáveis `PUBLIC_KEY` e `PRIVATE_KEY` respectivamente.

* Git
    * [Download e instalação](https://git-scm.com/downloads).
    * _Pré-requisito caso a intenção seja baixar o projeto via `clone` e/ou contribuir com o projeto._

* Node.js : v12+
    * [Download e instalação](https://nodejs.org/en/download/). Caso não utilize este link para instalação, garanta também a instalação do NPM para gerenciar as dependências do projeto.
    * _Pré-requisito caso a intenção seja executar instalar as dependências do projeto e executar as tarefas do projeto utilizando Node.js._

* Docker
    * [Download e instalação](https://docs.docker.com/get-docker/)
    * _Pré-requisito caso a intenção seja executar os testes via Docker._

## Execução dos testes

* Baixe o projeto em sua máquina.
* Acesse o diretório raiz do projeto via terminal, o diretório raiz contém o arquivo `package.json`

### Via Node.js

* Instale as dependências do projeto:
```
npm install
```

* Execute a auditoria sobre as dependências para verificar itens de segurança:
```
npm audit
```

* Execute a análise estática de código:
```
npm run lint
```

* Execute o teste:
```
PUBLIC_KEY=<chave pública conta marvel> PRIVATE_KEY=<chave privada conta marvel> npm run test
```
### Via Docker

* Crie a imagem docker com o projeto e suas dependências já com verificação do audit e análise estática do código:
```
docker build --target build -t test-api .
```

* Execute os testes com a imagem Docker criada:
```
docker run --name api-test -e PUBLIC_KEY=<chave pública conta marvel> -e PRIVATE_KEY=<chave privada conta marvel> --rm -v <caminho absoluto do diretório raiz do projeto>/output:/test/output test-api
```

## Resultado dos testes

* Durante a execução dos teste é possível acompanhar o log no terminal que foi executado


* Após execução dos teste é possível ver o resultado em um arquivo HTML localizado no diretório `./output` com o nome `test-results.html`, então basta abri-lo com seu navegador web.