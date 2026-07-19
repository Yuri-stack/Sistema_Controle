import { createContext, useState } from "react";
import { Arquivo, ContextType, ProviderProps, Usuario } from "../models/types";

export const Context = createContext({} as ContextType);

export function Provider({ children }: ProviderProps) {

    const [usuarioAtual, setUsuarioAtual] = useState<Usuario>({} as Usuario)

    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    const [arquivos, setArquivos] = useState<Arquivo[]>([])

    return (
        <Context.Provider value={{ usuarioAtual, setUsuarioAtual, usuarios, setUsuarios, arquivos, setArquivos }}>
            {children}
        </Context.Provider>
    )

}