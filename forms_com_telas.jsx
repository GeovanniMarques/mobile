// Formulario com telas

import React, { useState } from "react"
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity }
    from "react-native"

// Import da navegação
import { NavigationContainer } from "@react-navigation/native"

// Import do estilo de navegação
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Criar o Stack (modo de navegação)
const Stack = createNativeStackNavigator();

function TelaInicial({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Bem-vindo(a)!</Text>
            <Button
                title="Ir para cadastro"
                onPress={() => navigation.navigate('Cadastro')}
            />
        </View>
    )
}

function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState(null);
    
    function enviarCadastro() {
        navigation.navigate('Perfil', {
            nomeUsuario: nome,
            emailUsuario: email
        });
    }

    function limparCampos() {
        setNome(undefined);
        setEmail(undefined);
        setUsuario(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />

                {/* View para o botão */}
                <View style={styles.botoesContainer}>
                    <TouchableOpacity
                        style={styles.botaoEnviar}
                        onPress={enviarCadastro}>
                        <Text style={styles.textoBotao}>
                            Enviar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoCancelar}
                        onPress={limparCampos}>
                        <Text style={styles.textoBotao}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

function TelaPerfil({ route, navigation }) {
    // Receber os dados
    const { nomeUsuario, emailUsuario } = route.params;

    return (
        <View style={styles.container}>
            <Text>
                Bem-vindo(a), {nomeUsuario}
            </Text>

            <Text>
                Detentor do e-mail: {emailUsuario}
            </Text>

            <Button
                title='Voltar para tela inicial'
                // onPress={() => navigation.navigate('Inicial')}
                onPress={() => navigation.popToTop()}>
            </Button>
        </View>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Inicial'
                    component={TelaInicial}    
                />

                <Stack.Screen 
                    name='Cadastro'
                    component={TelaCadastro}
                />

                <Stack.Screen
                    name='Perfil'
                    component={TelaPerfil}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Estilização

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C1C1C5"
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 5
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    botaoEnviar: {
        padding: 12,
        borderRadius: 8,
        // width: '48%'
        alignItems: "center",
        backgroundColor: "#0e7fdb",
    },
    botaoCancelar: {
        padding: 12,
        borderRadius: 8,
        // width: '48%'
        alignItems: "center",
        backgroundColor: "darkred",
    },
    textoBotao: {
        color: "white",
        fontWeight: "bold",
    },
    form: {
        backgroundColor: "#272626",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        width: "80%",
        // borderWidth: 1,
        // borderColor: "black",
    },
})