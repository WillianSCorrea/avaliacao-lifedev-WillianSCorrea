import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config'; // Ajuste o caminho conforme necessário
import { sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✔️ Email enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      setError('❌ ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu email cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Link'}
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="links">
        <Link to="/login">Voltar ao Login</Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
