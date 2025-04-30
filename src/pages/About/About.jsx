import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o <span>Life</span>Dev </h2>
      <p>
       Projeto criado para servir como base para o aprendizado de React ,no terceiro semestre do curso de Desenvolvimento de Software e Multiplataforma da Fatec Matão
      </p>
      <Link to="/posts/create" className='btn'>Crir Post</Link>
    </div>
  );
}
export default About;