# Jogo de adivinhação

## Persistência de dados
Em vez de forçar o fechamento do app, salvamos as informações localmente para que o sistema possa "ressuscitar" a sessão exatamente de onde parou.

### 1. Armazenamento Local:
Para dados que devem sobreviver ao fechamento do app ou reinicialização do celular, você precisa de uma camada de armazenamento físico:

- **AsyncStorage**: O padrão da comunidade. É simples de usar e assíncrono, ideal para configurações pequenas, preferências do usuário ou tokens de sessão.
- **MMKV**: Uma alternativa ***moderna*** e extremamente ***rápida*** *(até 30x mais que o ``AsyncStorage``)*. Ele usa memória mapeada para leitura/escrita quase instantânea, o que evita pequenos "travamentos" na interface ao carregar dados pesados.
- **Expo SecureStore**: Essencial para dados sensíveis como senhas ou tokens de autenticação, pois utiliza criptografia nativa (``Keychain`` no ``iOS`` e ``Keystore`` no ``Android``).

### 2. Gerenciamento de Estado Persistente (A "Mágica")
Em vez de salvar manualmente cada variável, podemos usar bibliotecas de estado que fazem isso automaticamente: 

- **Zustand com Persist Middleware**: Atualmente é a opção favorita por ser leve e fácil. Você define seu estado *(ex: userProfile)* e diz ao ``Zustand`` para "persistir". Ele cuidará de salvar no **AsyncStorage/MMKV** sempre que algo mudar.
- **Redux Persist**: Para aplicações grandes e complexas que já usam ``Redux``. Ele "hidrata" o estado do app assim que ele abre, preenchendo todos os campos com o que foi salvo na última vez. 

### 3. Estratégia de Sessão e Autenticação
A prática mais comum para evitar que o usuário precise fazer login toda vez é:

1. O usuário faz login;
2. O app salva o Token de Acesso no armazenamento seguro;
3. Ao abrir o app, um script de inicialização verifica se o token existe;
4. Se sim, o app pula a tela de login e vai direto para a Home, carregando os dados do estado persistido.

### Exemplo Simples (Fluxo de Persistência)
| Etapa | Ação Técnica | Objetivo |
|-----|-----|-----|
| **Ao Digitar** | Atualizar o ``state`` (ex: ``useState``) | Refletir na interface instantaneamente. |
| **Ao Mudar** | Gravar no ``AsyncStorage`` | Garantir que o dado está no disco. |
| **Ao Abrir o App | Ler do ``AsyncStorage`` no ``useEffect | Recuperar o progresso do usuário. |

# Estudar sobre o conceito Offline-first. É a filosofia de que o app deve funcionar perfeitamente sem internet, salvando tudo localmente primeiro e sincronizando com o servidor depois. Isso torna a experiência de "fechar e abrir" o app imperceptível para o usuário.