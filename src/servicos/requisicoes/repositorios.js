import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function salvarRepositorioUsuario(id, name, data, postId) {
    try {
        await api.put(`/repos/${id}`, {
            id: id,
            name: name,
            data: data,
            postId: postId
        })
        return "sucesso"
    }
    catch (error) {
        console.log(error)
        return "erro"
    }
}

export async function pegarRepositoriosPeloNome(id, name) {
    try {
        const resultado = await api.get(`/repos?postId=${id}&name=${name}`)
        return resultado.data
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function criarRepositorioUsuario(name, data, postId) {
    try {
        await api.post(`/repos`, {
            name: name,
            data: data,
            postId: postId
        })
        return "sucesso"
    }
    catch (error) {
        console.log(error)
        return "erro"
    }
}

export async function deletarRepositorioUsuario(id) {
    try {
        await api.delete(`/repos/${id}`)
        return "sucesso"
    }
    catch (error) {
        console.log(error)
        return "erro"
    }
}