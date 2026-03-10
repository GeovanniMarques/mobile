import React from "react"
import { View, Text, Button, StyleSheet} from "react-native"

// Import da navegação
import { NavigationContainer } from "@react-navigation/native"
// Import do estilo de navegação
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Criar o Stack (modo de navegação)
const Stack = createNativeStackNavigator()

// Criar tela 1 -> ========== HOME ==========
// (para ter navegabilidade passar o navigation)
function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>
                Textinho qualquer
            </Text>
            <Button 
                title="Texto para ir para outra tela"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

function LoginScreen({ navigation }) {
    return (
        <View>
            <Text>
                Tela de login
            </Text>
            <Button
                title="Voltar"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Definir as rotas */}
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}