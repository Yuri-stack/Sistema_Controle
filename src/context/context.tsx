import { createContext, useState } from "react";
import { Arquivo, ContextType, ProviderProps, Usuario } from "../models/types";
import { AxiosError } from "axios";

export const Context = createContext({} as ContextType);

export function Provider({ children }: ProviderProps) {

    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    const [arquivos, setArquivos] = useState<Arquivo[]>([{ id: 123, nome: "React", criadoEm: '05/07/2026', data: '05/07/2026', tamanho: 128, url: 'url_do_barulho' }])

    async function cadastroUsuario({ nome, usuario, senha }: Usuario) {
        setUsuarios([...usuarios, { nome, usuario, senha }])
    }

    async function login({ usuario, senha }: Usuario) {
        const usuarioEncontrado = usuarios.filter(u => { return u.usuario === usuario })
        const senhasCombinam = usuarioEncontrado[0].senha === senha

        const token = `${senha}${usuarioEncontrado[0].usuario}123`

        if (usuarioEncontrado && senhasCombinam) {
            return { token }
        }

        throw new AxiosError
    }

    return (
        <Context.Provider value={{ usuarios, cadastroUsuario, login, arquivos, setArquivos }}>
            {children}
        </Context.Provider>
    )

}