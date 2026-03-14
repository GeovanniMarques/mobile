# 📱 Desenvolvimento de aplicativos mobile

Este repositório contém os projetos e exercícios desenvolvidos durante a disciplina de Desenvolvimento de Aplicativos Mobile, parte da grade do curso técnico em Desenvolvimento de Sistemas no FIRJAN SENAI Maracanã.

## 🚀 Tecnologias e Ferramentas

Para o desenvolvimento destas aplicações, utilizamos o ecossistema React Native. Abaixo, detalhamos os componentes essenciais do ambiente:

| Ferramenta | Descrição |
|-----|-----|
|**Node.js**| *Ambiente de execução open source que permite rodar JavaScript no lado do servidor, fora do navegador (essencial para o tooling do React Native)*|
|**NPM**| *Gerenciador de pacotes padrão e oficial do Node.js, utilizado para instalar bibliotecas e dependências*|
|**Expo CLI**| *Framework e platafomra que facilita a execução, compilação e visualização do projeto diretamente no dispositivo físico ou simulador*|

## 📂 O papel do .gitignore
Ao criar um projeto com Expo, um arquivo chamado **.gitignore** é gerado automaticamente. Isso é *fundamental* porque a pasta ``node_modules`` *(onde ficam o React e o React Native)* é extremamente pesada, podendo passar de 500MB.

O ``.gitignore`` instrui o Git a ignorar essa pasta, garantindo que apenas o seu código e o arquivo ``package.json`` *(nossa "lista de compras")* sejam enviados ao GitHub. Assim, para rodar um projeto baixado, basta executar o comando npm install para reconstruir as dependências localmente.

## 🛠️ Roteiro de Comandos (Guia Prático)

Siga as etapas abaixo para preparar seu ambiente e rodar o projeto localmente.

### 1. Preparação (Apenas uma vez)

Certifique-se de ter o Node.js instalado e configure o Expo **globalmente**:

```Bash
# Verifica a versão do Node.js
node -v

# Verifica a versão do NPM
npm -v

# Instala a interface do Expo globalmente
npm install -g expo-cli

# (Caso deseje) verifica a versão do Expo
expo --version
# OU (se a versão antiga for usada)
npx expo --version
```

### 2. Criando um Novo Exercício

Para iniciar um projeto do zero, o comando abaixo cria a estrutura base e já baixa o ``React`` e o ``React Native`` **automaticamente** para a pasta:

```Bash
npx create-expo-app nome-do-projeto --template blank
```

### 3. Adicionando "Móveis" (Dependências)

Após criar o projeto, entramos na pasta e instalamos o que for necessário para aquele exercício específico *(como sistemas de navegação, ou para que o aplicativo tenha múltiplas telas, instalamos o ``React Navigation``)*:

```Bash
cd nome-do-projeto

# Instalação do sistema de rotas e suas dependências de suporte
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# Suporte para visualização via Web (opcional)
npx expo install react-native-web react-dom @expo/metro-runtime
```

### 4. Execução

Para rodar o projeto e gerar o QR Code para leitura no app Expo Go (disponível na Play Store/App Store):

```Bash
npm start
```

## 📱 Visualizando no Celular (Expo Go)
Para testar o aplicativo diretamente no seu dispositivo físico:

- Instale o aplicativo `**Expo Go**` *(disponível na Play Store ou App Store)*.
- Certifique-se de que o seu celular e o seu computador estão conectados na ***mesma rede Wi-Fi***.
- No terminal do VS Code, após rodar ``npm start``, um QR Code aparecerá.
- Abra o app Expo Go no celular e use a função *"Scan QR Code"*.

## 🔄 Portabilidade: Rodando em outra máquina
Graças ao arquivo ``package.json``, você não precisa se preocupar em transferir as bibliotecas instaladas. Caso baixe este repositório em outro computador:

- Abra o terminal na pasta do projeto.
- Digite o comando:
```Bash
npm install
```

O Node.js lerá a "lista de dependências" e baixará tudo o que é necessário automaticamente para você.

## 🛠️ Solução de Problemas (Troubleshooting)
Durante o desenvolvimento no SENAI, é comum encontrar alguns obstáculos técnicos. Aqui estão as soluções para os mais frequentes:

### 1. O QR Code não carrega no celular (Erro de Rede)
Este é o erro mais comum. Geralmente ocorre quando o computador e o celular não conseguem se "enxergar" na rede, quando não conseguem estabelecer uma conexão direta via IP local.

- **Solução:** Certifique-se de que ambos estão na mesma rede Wi-Fi. Se o erro persistir, tente iniciar o projeto com o modo tunnel:
```Bash
npx expo start --tunnel
```

<br>

- **O que é o ``--tunnel``?**
É um parâmetro que cria uma "ponte" segura e pública na internet (usando um serviço chamado ngrok) para conectar seu computador ao servidor do Expo.

- **Por que usamos?**
Em redes compartilhadas (como as do SENAI ou redes públicas), existem bloqueios de segurança (Firewalls) que impedem que dois dispositivos se comuniquem diretamente, mesmo estando no mesmo Wi-Fi. O túnel "pula" esse bloqueio, enviando os dados do seu código para um servidor externo que os repassa para o seu celular.



<br>

> ⚠️ ***Nota:*** *A conexão via túnel pode ser um pouco mais lenta para carregar as alterações do que a conexão direta (LAN), então use-a apenas quando a conexão padrão falhar.*

> 📝 ***Dica extra:*** *Se for usar o --tunnel no SENAI, pode ser que o terminal peça para você instalar o pacote @expo/ngrok na primeira vez. Basta confirmar com ``y (yes)`` e ele fará tudo sozinho.*

### 2. Erro de Permissão no Windows (PowerShell)
Se o terminal impedir a execução de scripts do NPM:

- **Solução:** Abra o PowerShell como Administrador e execute:

```PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. Pasta node_modules corrompida
Se o projeto começar a apresentar erros estranhos após a instalação de uma nova biblioteca:

- **Solução:** O famoso "formatar" do Node.js:

1. Apague a pasta node_modules.
2. Apague o arquivo package-lock.json.
3. Execute npm install novamente.