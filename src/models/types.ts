import { ReactNode } from "react";

export interface Arquivo {
  id?: string | number
  nome: string
  criadoEm?: string
  data?: string
  tamanho?: number
  url?: string
}

export interface Sessao {
  token: string
  usuario?: string
}

export interface ErroApi {
  mensagem?: string
}

export type Usuario = {
  nome?: string;
  usuario: string;
  senha: string;
}

export type ContextType = {
  usuarios: Usuario[]
  arquivos: Arquivo[]

  setArquivos: (arquivos: Arquivo[]) => void
  cadastroUsuario: ({ nome, usuario, senha }: Usuario) => void
  login: ({ usuario, senha }: Usuario) => Promise<{ token: string; }>
}

export interface ProviderProps {
  children: ReactNode;
}

export interface LoginResposta {
  token: string
}
