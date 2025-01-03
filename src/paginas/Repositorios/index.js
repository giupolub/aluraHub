import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { pegarRepositoriosPeloNome } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nameRepo, setNameRepo] = useState([]);
    const estaNaTela = useIsFocused()

    useEffect(() => {
        async function retornoRepositorios() {
            const resultado = await pegarRepositoriosDoUsuario(route.params.id)
            setRepo(resultado)
        }
        retornoRepositorios()
    }, [estaNaTela])

    async function buscaRepositorioPeloNome() {
        const resultado = await pegarRepositoriosPeloNome(route.params.id, nameRepo)
        setRepo(resultado)
        setNameRepo("")
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Busque pelo nome"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nameRepo}
                onChangeText={setNameRepo}
            />

            <TouchableOpacity
                style={estilos.botao}
                onPress={buscaRepositorioPeloNome}
            >
                <Text style={estilos.textoBotao}>
                    Buscar
                </Text>
            </TouchableOpacity>

            <FlatList
                data={repo}
                style={{ width: "100%" }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => navigation.navigate("InfoRepositorio", { item })}
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}
