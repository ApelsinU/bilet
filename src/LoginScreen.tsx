import { useState, type FormEvent } from 'react'

const LOGIN = 'маргарита'
const PASSWORD = '123'

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (login.trim() === LOGIN && password === PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="login-badge" aria-hidden="true">
          🍂
        </span>
        <h1 className="login-title">Добро пожаловать</h1>
        <p className="login-subtitle">Войдите, чтобы продолжить</p>
        <div className="login-field">
          <label htmlFor="login">Логин</label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value)
              setError(false)
            }}
            placeholder="Введите логин"
            autoFocus
            autoComplete="username"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError(false)
            }}
            placeholder="Введите пароль"
            autoComplete="current-password"
          />
        </div>
        {error && <p className="login-error">Неверный логин или пароль</p>}
        <button className="login-button" type="submit">
          <span>Войти</span>
        </button>
      </form>
    </div>
  )
}

export default LoginScreen