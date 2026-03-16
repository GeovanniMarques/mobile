import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

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

// INSTANCIAMENTO DE VARIÁVEIS
const numeroAleatorio = gerarNumeroAleatorio();

// ===============================================
// TELAS DO APP
// ===============================================

// 1ª TELA - HOME
function HomeScreen({ navigation }) {
	return (<View style={styles.container}>
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
	const [palpite, setPalpite] = useState('');
	const [tentativas, setTentativas] = useState(5);
	const [palpites, setPalpites] = useState([]);
	const [mensagem, setMensagem] = useState('');

	// FUNÇÃO PARA VERIFICAR PALPITE DO USUÁRIO
	function verificarPalpite() {
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
		const novosPalpites = [];
		const novasTentativas = tentativas--;

		setPalpites(novosPalpites);
		setTentativas(novasTentativas);

		// Limpeza do campo de palpite
		setPalpite('');

		// Verificação se há palpites restantes
		if (novasTentativas === 0) {
			navigation.navigate('Finish', {
				tentativasUsadas: 5,
				perdeu: true,
			});
			return;
		}

		// Dica para o usuário se o número secreto é maior ou menor que seu palpite
		setMensagem(palpiteNumero > numeroAleatorio ? `O número secreto é menor que ${palpiteNumero}.` : `O número secreto é maior que ${palpiteNumero}.`);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.tituloGameScreen}>
				Numero Secreto:
			</Text>
			<Text style={styles.exibicaoNumeroSecreto}>
				{numeroAleatorio}
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

			<Text style={styles.textoHomeScreen}>
				Tentativas restantes: {tentativas}
				{'\n'}
				Palpites: {palpites}
			</Text>
		</View>
	)
}

// 3ª TELA - RESULTADO
function FinishScreen({ route, navigation }) {
	const palpite = route.params;

	return (
		<View style={styles.container}>
			<TextInput></TextInput>
			<TouchableOpacity
				style={styles.botao}
				onPress={() => navigation.popToTop()}
			>
				<Text style={styles.botao}>
					JOGAR NOVAMENTE
				</Text>
			</TouchableOpacity>
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
				/>
				<Stack.Screen
					name='Game'
					component={GameScreen}
				/>
				<Stack.Screen
					name='Finish'
					component={FinishScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
		backgroundColor: '#623CEA',
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
		fontSize: 100,
		color: '#545E56'
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
});
