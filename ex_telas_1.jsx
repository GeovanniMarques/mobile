import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";

// Import da navegação
import { NavigationContainer } from "@react-navigation/native";

// Import do estilo da navegação (Stack)
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Criação do Stack
const Stack = createNativeStackNavigator();

// CADA TELA SERÁ FEITA POR UMA FUNÇÃO
function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    // const [usuario, setUsuario] = useState('');

    function enviarCadastro() {
        navigation.navigate('Home',
            {
                emailUsuario: email,
                senhaUsuario: senha
            }
        )

        // Limpa os campos IMEDIATAMENTE após a navegação
        // Assim, ao voltar para cá no Logout, estará tudo limpo.
        setEmail('');
        setSenha('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Digite o seu e-mail'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digite a sua senha'
                    secureTextEntry // Para ocultar a senha
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableOpacity
                    style={styles.botaoEntrar}
                    onPress={enviarCadastro}
                >
                    <Text style={styles.textoBotao}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function HomeScreen({ route, navigation }) {
    // Recebendo os dados do usuário
    const { emailUsuario } = route.params;

    return (
        <View style={styles.container}>
            <Text>
                Bem vindo(a), {emailUsuario}!
            </Text>

            <TouchableOpacity
                style={styles.botaoHome}
                onPress={() => navigation.navigate('Profile',
                    { emailUsuario: emailUsuario }
                )}
            >
                <Text style={styles.textoBotao}>
                    Ir para perfil
                </Text>
            </TouchableOpacity>
        </View>
    )
}

function ProfileScreen({ route, navigation }) {
    const { emailUsuario } = route.params;

    return (
        <View style={styles.container}>
            <Text>
                Perfil de usuário(a)
            </Text>

            <Text>
                {emailUsuario}
            </Text>

            <TouchableOpacity
                style={styles.botaoLogout}
                onPress={() => navigation.popToTop()}
            >
                <Text style={styles.textoBotao}>
                    Logout
                </Text>
            </TouchableOpacity>

        </View>
    )
}


// FUNÇÃO PRINCIPAL
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />

                <Stack.Screen name='Home' component={HomeScreen} />

                <Stack.Screen name='Profile' component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Estilização
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efeff3',
    },
    form: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#cecece',
        elevation: 8
    },
    input: {
        padding: 10,
        borderRadius: 10,
    },
    botaoEntrar: {
        backgroundColor: '#3ab322',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        textAlign: 'center',
    },
    botaoHome: {
        backgroundColor: '#2463aa',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        textAlign: 'center',
    },
    botaoLogout: {
        backgroundColor: '#ca2525',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        textAlign: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    }
});