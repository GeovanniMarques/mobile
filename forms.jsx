// Formulario

import React, { useState } from "react"
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity }
    from "react-native"
export default function App() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState(null);
    return (
        <View style={styles.container}>
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
            />

            {/* View para o botão */}
            <View style={styles.botoesContainer}>
                <TouchableOpacity
                    style={styles.botaoEnviar}
                    onPress={() => setUsuario({ nome, email })}>
                    <Text style={styles.textoBotao}>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </View>

            {usuario && (
                <Text>
                    Cadastro realizado para:
                    {"\n"}
                    Nome: {usuario.nome}
                    {"\n"}
                    Email: {usuario.email}
                </Text>
            )
            }
        </View >
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
    textoBotao: {
        color: "white",
        fontWeight: "bold",
    }
})