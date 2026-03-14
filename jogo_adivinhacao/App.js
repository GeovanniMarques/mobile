import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Import de navegação
import { NavigationContainer } from "@react-navigation/native";

// Import de estilo de navegação (Stack)
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Criação de Stack (modo de navegação)
const Stack = createNativeStackNavigator();

// O que isso faz?
// import { StatusBar } from 'expo-status-bar';

// ===============================================
// 1ª TELA - HOME
// ===============================================
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
      onPress={navigation.navigate('')}
    >
      <Text style={styles.textoBotao}>
        GERAR NÚMERO ALEATÓRIO
      </Text>
    </TouchableOpacity>
  </View>)
}

function gerarNumeroAleatorio() {
  var numeroAleatorio = Math.random() * 101; // Multiplicação para incluir o número 100
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Jogo de adivinhação'
          component={HomeScreen}
        /> 
        {/* options */}
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
    fontSize: 25,
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
});
