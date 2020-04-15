#language: pt
Funcionalidade: Classificação por Gênero para Publicações de Empresas
  EU ENQUANTO analista de métricas sociais,
  GOSTARIA que os gêneros de organizações não fossem classificados como homem ou mulher,
  PARA obter métricas mais precisas dos autores das publicações.

  Esquema do Cenário: Publicação realizada por um perfil comercial não pode ser classificada com o gênero de pessoa
    Dado que coletei o conteúdo publicado por um perfil comercial em uma mídia social
    Quando realizar uma classificação quanto ao gênero
    Então este conteúdo não deve ser classificado com o gênero "<genero>"
    Exemplos:
      | genero |
      | Homem  |
      | Mulher |

  Esquema do Cenário: Comentário em uma publicação realizado por perfil comercial não pode ser classificado com o gênero de pessoa
    Dado que coletei o comentário de um perfil comercial em uma publicação em uma mídia social
    Quando realizar uma classificação quanto ao gênero
    Então este conteúdo não deve ser classificado com o gênero "<genero>"
    Exemplos:
      | genero |
      | Homem  |
      | Mulher |
