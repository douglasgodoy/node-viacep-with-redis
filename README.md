TESTE USANDO VIACEP COM CACHE EM REDIS.


algumas coisas são necessárias para o start dessa aplicação, sendo elas:

 - docker
 - docker-compose
 - git


 logo após o git clone, rode na pasta raiz o seguinte comando

 docker-compose up --build


após o build do redis, da api e do front estarem prontos acesse o host (por padrao o react disponibiliza o seu host nos logs, parecido com esse)

frontend    |   Local:            http://localhost:3000
frontend    |   On Your Network:  http://172.29.0.4:3000

FUNCIONALIDADE

assim que vc colocar um cep válido no campo ele vai gerar um retorno em json, que será imprimido nesse mesmo formato em uma div,
que terá todos os dados de retorno da VIACEP e mais duas flags, uma é a "cache", que indica se aquela requisição vem do redis ou não,
e a flag "timerReq" que mostra o tempo que aquela requisição demorou. exemplo de retorno:

digitei o cep 87055000 pela primeira vez, por padrão a api terá que bater na VIACEP retornando todos os dados da mesma e as flags mencionadas como
        
        
    {
        ...dadosVIACEP,
        "cache":"false",
        "timerReq":"432ms" 
    }


porem assim que o cliente bater novamente nesse cep terá os seguintes parametros

   {
       ...dadosVIACEP,
       "cache":"true",
       "timerReq":"10ms"
   }


CONSIDERAÇÕES FINAIS

por causa dos compromissos não consegui gastar muito tempo com esse desafio, porem se tivesse, poderia criar uma conexão com o mongo
para ter uma base de dados voltada pra armazenamento e não só para cache como é o caso do redis. Outra coisa tbem seria caprichar um pouco mais
no front end, porem com outros compromissos a unica opção viável pra mim foi simplificar o maximo possivel.