# Teste de Analytics – Guilherme Rocha
## 📋 Visão Geral e Requisitos

O Dragon Study é um aplicativo voltado para quem deseja organizar e revisar conteúdos de forma prática.
Os usuários podem criar decks (conjuntos de cartões), adicionar perguntas e respostas, e estudar revisando os conteúdos salvos.

Objetivos principais:

- Permitir o cadastro e login de usuários.

- Criar, editar e excluir decks e cards personalizados.

- Oferecer uma tela de estudo com navegação intuitiva.

- Salvar os dados localmente usando AsyncStorage.

Requisitos funcionais:

- Cadastro e autenticação de usuário.

- Criação e exclusão de decks.

- Adição, edição e remoção de cartões.

- Alteração de senha.

- Logout e persistência de dados local.

## 🧠 Ferramentas Utilizadas
- React Native (Expo)
- React Navigation — controle de rotas e navegação entre telas
- AsyncStorage — armazenamento local de dados
- JavaScript (ES6+)
- Node.js + npm — ambiente e gerenciador de pacotes
  
## ⚙️ Funcionalidades
- Autenticação: Login e cadastro de usuário 
- Decks: Criação, Remoção e Atualização de decks
- Cards: Criação, Remoção e Atualização de cards
- Tela de Estudo: Usuário pode estudar um deck, passando por todos os cards e recebendo um resumo do seu desempenho no final
- Configurações: Alterar senha e sair da conta
- Armazenamento: O armazenamento de todos os dados é feito de forma local pelo Async Storage

## 🎥 Demonstração
https://github.com/user-attachments/assets/dd38d8ac-7872-4219-8402-1ac3b8f1da95

## 💻 Instalação e Execução
Para executar os scripts faça:
1. Clone o repositório:
     ```
     git clone https://github.com/Guizo000/Projeto_ReactNative.git
     cd Teste_Analytics_GuilhermeRocha/src
     ```
2. Instale as dependências:
   
    ```
    npm install
    ```
3. Execute o Projeto:

   ```
   npx expo start
   ```
4. Abra no seu dispositivo:
   - Escaneie o QR Code com o app Expo Go

## 🌱 Aprendizados e Próximos Passos
Durante o desenvolvimento, melhorei minhas habilidades de:

- Criar interfaces com React Native de forma mais organizada e modular.
- Manipular dados com AsyncStorage.
- Navegar entre telas com React Navigation.
- Estruturar um app mobile completo do zero.

Acredito também que guardo como experiência pessoal a dificuldade de implementar um projeto como este e a lição de lidar com indecisões  
antes e durante o projeto de forma rápida e concisa de modo a não me perder em relação as datas.

Os próximos passos para aperfeiçoar o projeto em minha opinião são:

- Implementar sincronização com banco de dados.
- Adicionar estatísticas de estudo (tempo e desempenho).
- Criar modo de revisão espaçada.


