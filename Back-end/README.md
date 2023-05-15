## 👋 Bem-vindo ao test-FullStack Shopper

### Sobre o meu projeto

O projeto consiste no desenvolvimento de uma ferramenta para atualização massiva de preços em lojas de e-commerce. A aplicação permite que os usuários carreguem um arquivo CSV contendo os códigos de produtos e os novos preços a serem atualizados. A ferramenta também inclui recursos adicionais para evitar erros que possam prejudicar o negócio.

Funcionalidades:

- Carregamento de arquivo de precificação: O sistema permite que o usuário carregue um arquivo CSV contendo os códigos de produtos e os novos preços a serem atualizados.
- Validação do arquivo: Ao clicar no botão "VALIDAR", o sistema realiza as seguintes verificações:
- Verifica se todos os campos necessários estão presentes no arquivo.
- Verifica se os códigos de produtos informados existem.
- Verifica se os preços estão preenchidos e são valores numéricos válidos.
- Verifica se o arquivo respeita as regras estabelecidas no cenário.
- Exibição das informações: Após a validação do arquivo, o sistema exibe as seguintes informações dos produtos que foram enviados: Código, Nome, Preço Atual e Novo Preço.
- Indicação de regras quebradas: Caso uma ou mais regras de validação tenham sido quebradas, o sistema exibe ao lado de cada produto qual regra foi violada.
- Atualização de preços: O sistema possui um botão "ATUALIZAR" que fica habilitado apenas se todos os produtos do arquivo estiverem validados e sem regras quebradas. Ao clicar nesse botão, o sistema salva o novo preço no banco de dados e deixa a tela pronta para o envio de um novo arquivo.
- Atualização de preços de pacotes: Os preços de custo dos pacotes também são atualizados, sendo a soma dos custos dos seus componentes. Os preços de custo dos produtos que não são pacotes não são atualizados.


### Testar a aplicação BACK-END

1. Certifique-se de ter o Node.js instalado em sua máquina. Caso não tenha, você pode baixá-lo em: https://nodejs.org/en/.

2. Baixe o arquivo .zip do projeto em sua máquina local ou clone o repositório público do projeto a partir do link do GitHub.

3. Descompacte o arquivo baixado, se necessário, ou navegue até a pasta raiz do projeto clonado.

4. Certifique-se de ter o Docker instalado em sua máquina. Caso não tenha, você pode baixá-lo em: https://www.docker.com/get-started.

5. No terminal, navegue até a pasta raiz do projeto.
   
6. Renomeie o arquivo .env.example para .env
   
7. Abra o arquivo .env em um editor de texto.
   
8. Preencha as variáveis de ambiente conforme necessário, como o host, porta e credenciais do banco de dados MySQL. Certifique-se de que as configurações correspondam às configurações do seu ambiente de desenvolvimento.
   
9.  Salve o arquivo .env após preencher as variáveis de ambiente.

10.  Execute o comando `docker-compose up -d` para iniciar o ambiente de desenvolvimento, que inclui o banco de dados MySQL.

11. Aguarde até que o ambiente seja configurado corretamente. Isso pode levar alguns minutos.

12. Em um novo terminal, navegue até a pasta raiz do projeto.

13. Execute o comando `npm install` para instalar as dependências do projeto listadas no arquivo package.json.

14.  Após a instalação das dependências, execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.

15. Aguarde até que o servidor seja iniciado corretamente. Você verá uma mensagem indicando que o servidor está sendo executado na porta especificada.


###  🚀 Tecnologias Utilizadas

##### Back-end:

- Node.js
- TypeScript

##### Banco de dados:

 - MySQL

 
##### Front-end:

- React.js
- TypeScript
- HTML
- SASS


---

Feito por Cynthia Araujo :purple_heart: