import { useContext, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
// import api from '../api/axios'
import { saveSession } from '../api/auth'
import type { ErroApi } from '../models/types'
import { Context } from '../context/context'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const { login } = useContext(Context)

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    if (!usuario || !senha) {
      setErro('Informe usuário e senha.')
      return
    }

    setCarregando(true)
    try {
      const dados = await login({ usuario, senha });
      // const { data } = await api.post<LoginResposta>('/login', { usuario, senha })

      saveSession({ token: dados.token, usuario })
      navigate('/arquivos')

    } catch (err) {
      const erroAxios = err as AxiosError<ErroApi>
      setErro(erroAxios.response?.data?.mensagem || 'Usuário ou senha inválidos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 shadow-glow">
          <h1 className="text-2xl font-bold text-gray-100 mb-1">Entrar</h1>
          <p className="text-sm text-gray-500 mb-6">
            Acesse sua conta para ver seus arquivos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-linear-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-60 text-white font-semibold py-2.5 transition shadow-glow"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-accent-400 hover:text-accent-300 font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
