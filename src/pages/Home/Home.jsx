import styles from './Home.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { PostCard } from '../../components/PostDetail/PostCard';
import { useAuthValue } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuthValue();
  const { documents: posts, loading } = useFetchDocuments('posts');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>

     

      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div className={styles.post_list}>
        {loading && <p className={styles.loading}>Carregando...</p>}
        {posts &&
          posts.map((post) => (
            <div key={post.id} className={styles.post_wrapper}>
              <Link to={`/posts/${post.id}`}>
                <PostCard post={post} />
              </Link>
            </div>
          ))}
        {!user && (
          <div className={styles.login_message}>
            <p>Para interagir com os posts, faça <Link to="/login">login</Link> ou <Link to="/register">cadastre-se</Link></p>
          </div>
        )}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;