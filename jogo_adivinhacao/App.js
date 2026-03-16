import React, { useState } from "react";
import {
	StyleSheet, Text, TextInput, View, TouchableOpacity,
	KeyboardAvoidingView, Platform
} from 'react-native';

/* 
- KeyboardAvoidingView empurra os componentes para cima
automaticamente quando o teclado aparece.

- Platform.OS é o React Native verificando em qual sistema o app
está rodando para escolher o comportamento certo automaticamente.

- BeckHandler serve para fechar o App, porém não é recomendado
por questões de desempenho do dispositivo e é considerado uma péssima
prática (especialmente no iOS).
O ideal é focar em salvar o estado do usuário, implementando a
Persistência de Dados.
*/

// Import de navegação
import { NavigationContainer } from "@react-navigation/native";

// Import de estilo de navegação (Stack)
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Criação de Stack (modo de navegação)
const Stack = createNativeStackNavigator();

// É um componente que permite controlar a barra de status do dispositivo
// (aquela parte superior que mostra hora, bateria, rede etc.),
// ajustando cor, estilo e visibilidade dentro do app.
// import { StatusBar } from 'expo-status-bar';

// ===============================================
// LÓGICA DO JOGO
// ===============================================

// FUNÇÃO PARA GERAR NÚMERO ALEATÓRIO
function gerarNumeroAleatorio() {
	return parseInt(Math.random() * 101); // Multiplicação para incluir o número 100
}

// ===============================================
// TELAS DO APP
// ===============================================

// 1ª TELA - HOME
function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			{/* Textos informativos */}
			<Text style={styles.textoBemVindo}>
				Olá, seja bem-vindo!
			</Text>
			<Text style={styles.textoHomeScreen}>
				Vamos jogar? Clique no botão para gerar um número aleatório de 0 a 100.
			</Text>
			<Text>
				⬇️ ⬇️ ⬇️
			</Text>

			{/* Botão para gerar número aleatório */}
			<TouchableOpacity
				style={styles.botaoHomeScreen}
				onPress={() => navigation.navigate('Game')}
			>
				<Text style={styles.textoBotao}>
					GERAR NÚMERO ALEATÓRIO
				</Text>
			</TouchableOpacity>
		</View>)
}

// 2ª TELA - JOGO
function GameScreen({ navigation }) {
	const [numeroAleatorio] = useState(() => gerarNumeroAleatorio())
	const [palpite, setPalpite] = useState('');
	const [tentativas, setTentativas] = useState(5);
	const [palpites, setPalpites] = useState([]);
	const [mensagem, setMensagem] = useState('');
	const [dica, setDica] = useState('');
	const [infoDica, setInfoDica] = useState('');
	const [diferenca, setDiferenca] = useState(0);

	// FUNÇÃO PARA VERIFICAR PALPITE DO USUÁRIO
	function verificarPalpite() {
		// Verificação de entrada vazia
		if (palpite === '') {
			setMensagem('Digite um número antes de adivinhar.');
			return;
		}

		const palpiteNumero = parseInt(palpite);

		// Validação de palpite
		if (isNaN(palpiteNumero) || palpiteNumero < 0 || palpiteNumero > 100) {
			setMensagem('Digite um número válido entre 0 e 100.');
			return;
		}

		// Verificação de acerto do número secreto
		if (palpiteNumero === numeroAleatorio) {

			// Encaminha o usuário para uma tela de parabéns caso acerte o número
			navigation.navigate('Finish', {
				tentativasUsadas: 5 - tentativas + 1
			});
			return;
		}

		// Atualiza palpites e tentativas
		const novosPalpites = [...palpites, palpiteNumero]; // Spread Operator (...), um recurso do JavaScript. Ele basicamente "espalha" todos os itens de um array dentro de outro.
		const novasTentativas = tentativas - 1; // tentativas-- retorna o valor ANTES de decrementar; use (tentativas - 1) para obter o valor já reduzido

		setPalpites(novosPalpites);
		setTentativas(novasTentativas);

		// Limpeza do campo de palpite
		setPalpite('');

		// Verificação se há palpites restantes
		if (novasTentativas === 0) {
			navigation.navigate('Finish', {
				numeroSecreto: numeroAleatorio,
				tentativasUsadas: 5,
				perdeu: true,
			});
			return;
		}

		// Dica para o usuário se o número secreto é maior ou menor que seu palpite
		setMensagem(palpiteNumero > numeroAleatorio ? `O número secreto é menor que ${palpiteNumero}.` : `O número secreto é maior que ${palpiteNumero}.`);

		/*
		Dica de proximidade de palpite do número secreto:
		- Muito quente: até 5 números de diferença;
		- Quente: até 10 números de diferença;
		- Morno: até 20 números de diferença;
		- Frio: maior que 20 números de diferença;
		*/

		// Calcula primeiro o valor da diferença
		const novaDiferenca = Math.abs(numeroAleatorio - palpiteNumero);

		// Atualiza o estado da diferença
		setDiferenca(novaDiferenca);

		if (novaDiferenca <= 5) {
			setDica('🔥');
			setInfoDica('Muito quente!');
		} else if (novaDiferenca <= 10) {
			setDica('🥵');
			setInfoDica('Quente!');
		} else if (novaDiferenca <= 20) {
			setDica('😐');
			setInfoDica('Morno!');
		} else {
			setDica('🥶');
			setInfoDica('Frio!');
		}

		// ***** Nota
		/* No React, quando chama setDiferenca(10), o valor da variável "diferenca"
		só muda de fato no próximo ciclo de renderização. Se você usar a variável logo abaixo do set,
		ela ainda terá o valor da jogada anterior.
		Usando a const "novaDiferenca", seu app responde instantaneamente ao palpite atual. */
	}

	// FUNÇÃO PARA MUDAR COR DO TEXTO DA DICA
	function corInfoDica(diferenca) {
		if (diferenca <= 5) return '#FF4500';  // Muito quente - vermelho
		if (diferenca <= 10) return '#FF8C00'; // Quente - laranja
		if (diferenca <= 20) return '#FFD700'; // Morno - amarelo
		return '#00BFFF'; 						// Frio - azul	  
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			// No iOS empurra o conteúdo para cima (padding)
			// No Android encolhe a tela (height)
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Text style={styles.tituloGameScreen}>
				Número Secreto:
			</Text>
			<Text style={styles.exibicaoNumeroSecreto}>
				{diferenca === 0 ? '?' : dica}
			</Text>
			<Text style={
				[styles.textoDica,
				{ color: corInfoDica(diferenca) }]}
			>
				{infoDica}
			</Text>

			<View style={styles.card}>
				<TextInput
					style={styles.input}
					placeholder="Digite um número de 0 a 100"
					value={palpite}
					onChangeText={setPalpite}
					// keyboardType="numeric" // Números + decimal
					keyboardType="number-pad" // Apenas números
				/>
				<TouchableOpacity
					style={styles.botaoGameScreen}
					onPress={verificarPalpite}
				>
					<Text style={styles.textoBotao}>
						ADIVINHAR NÚMERO SECRETO
					</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.infosGameScreen}>
				Tentativas restantes: {tentativas}
				{'\n'}
				Palpites inseridos: {palpites.join(', ')}
			</Text>
			<Text style={styles.mensagemGameScreen}>
				{mensagem}
			</Text>
		</KeyboardAvoidingView>
	)
}

// 3ª TELA - RESULTADO
function FinishScreen({ route, navigation }) {
	// Recebe os parâmetros passados pela navegação
	const { numeroSecreto, tentativasUsadas, perdeu } = route.params;

	// Padronização de palavra tentativa
	const palavraTentativa = tentativasUsadas != 1 ? 'tentativas' : 'tentativa';

	return (
		<View style={styles.container}>
			<Text style={styles.tituloFinishScreen}>
				{perdeu ? '😢 Que pena, você perdeu!' : '🎉 Parabéns, você acertou!'}
			</Text>
			<Text style={styles.mensagemFinishScreen}>
				{perdeu ? `O número secreto era ${numeroSecreto}!` : `Você adivinhou o número secreto em ${tentativasUsadas} ${palavraTentativa}!`}
			</Text>

			<View style={styles.containerBotoes}>
				<TouchableOpacity
					style={styles.botaoJogar}
					onPress={() => navigation.navigate('Game')}
				>
					<Text style={styles.textoBotao}>
						JOGAR NOVAMENTE
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.botaoSair}
					onPress={() => navigation.popToTop()}
				>
					<Text style={styles.textoBotao}>
						SAIR
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{
						title: '',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='Game'
					component={GameScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='Finish'
					component={FinishScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f5f0f6',
	},
	textoBemVindo: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	textoHomeScreen: {
		fontSize: 15,
		padding: 8,
		width: '80%',
		color: '#161925'
	},
	botaoHomeScreen: {
		marginTop: 10,
		padding: 8,
		borderRadius: 16,
		height: 50,
		width: '80%',
		backgroundColor: '#48639C',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textoBotao: {
		fontSize: 15,
		fontWeight: 'bold',
		// fontFamily: '',
		color: '#f5f0f6',
	},
	tituloGameScreen: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	exibicaoNumeroSecreto: {
		fontSize: 60,
		color: '#545E56'
	},
	textoDica: {
		fontSize: 15,
		fontWeight: 'bold',
		margin: 10,
	},
	card: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: '80%',
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	botaoGameScreen: {
		marginTop: 20,
		padding: 8,
		borderRadius: 16,
		height: 50,
		width: '80%',
		backgroundColor: '#53A548',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infosGameScreen: {
		fontSize: 15,
		fontWeight: "bold",
		padding: 8,
		width: '80%',
		color: '#161925'
	},
	mensagemGameScreen: {
		fontSize: 15,
		padding: 8,
		width: '80%',
		color: '#545E56',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tituloFinishScreen: {
		fontSize: 20,
		padding: 8,
		width: '80%',
		color: '#161925',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mensagemFinishScreen: {
		fontSize: 15,
		padding: 8,
		width: '80%',
		color: '#545E56',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerBotoes: {
		width: '80%',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	botaoJogar: {
		marginTop: 10,
		padding: 8,
		borderRadius: 16,
		height: 50,
		width: '60%',
		backgroundColor: '#48639C',
		alignItems: 'center',
		justifyContent: 'center',
	},
	botaoSair: {
		marginTop: 10,
		padding: 8,
		borderRadius: 16,
		height: 50,
		width: '30%',
		backgroundColor: '#ED474A',
		alignItems: 'center',
		justifyContent: 'center',
	},

});
