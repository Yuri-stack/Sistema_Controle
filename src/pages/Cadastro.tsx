import { useContext, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import type { ErroApi } from '../models/types'
import { Context } from '../context/context'
// import api from '../api/axios'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const navigate = useNavigate()

  const { cadastroUsuario } = useContext(Context)

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    if (!nome || !usuario || !senha) {
      setErro('Preencha nome, usuário e senha.')
      return
    }

    setCarregando(true)

    try {
      await cadastroUsuario({ nome, usuario, senha });
      // await api.post('/register', { nome, usuario, senha })

      setSucesso(true)
      setTimeout(() => navigate('/login'), 1200)

    } catch (err) {
      const erroAxios = err as AxiosError<ErroApi>
      setErro(
        erroAxios.response?.data?.mensagem ||
        'Não foi possível criar a conta. Tente outro usuário.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 shadow-glow">
          <h1 className="text-2xl font-bold text-gray-100 mb-1">
            Criar conta
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Cadastre-se para enviar e gerenciar seus PDFs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full rounded-lg bg-dark-800 border border-dark-600 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="nome.usuario"
                className="w-full rounded-lg bg-dark-800 border border-dark-600 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-dark-800 border border-dark-600 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            {erro && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="text-sm text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-lg px-3 py-2">
                Conta criada! Redirecionando para o login...
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-linear-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-60 text-white font-semibold py-2.5 transition shadow-glow"
            >
              {carregando ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
