import { createContext, useState } from "react";
import { Arquivo, ContextType, ProviderProps, Usuario } from "../models/types";

export const Context = createContext({} as ContextType);

export function Provider({ children }: ProviderProps) {

    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    const [arquivos, setArquivos] = useState<Arquivo[]>([
        {
            id: 123,
            nome: "React",
            criadoEm: '05/07/2026',
            data: '05/07/2026',
            tamanho: 128,
            url: 'url_do_barulho',
            conteudo: null
        }
    ])

    return (
        <Context.Provider value={{ usuarios, setUsuarios, arquivos, setArquivos }}>
            {children}
        </Context.Provider>
    )

}