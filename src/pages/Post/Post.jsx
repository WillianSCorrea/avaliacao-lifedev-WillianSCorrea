import styles from './Post.module.css';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument('posts', id);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar o post: {error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className={styles.post_container}>
      <h3>{post.title}</h3>
      <img src={post.image} alt={post.title} />
      <p>{post.body}</p>
      <h3>Este post trata sobre:</h3>
      <div className={styles.tags}>
        {post.tags?.map((tag) => (
          <p key={tag} className={styles.tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
