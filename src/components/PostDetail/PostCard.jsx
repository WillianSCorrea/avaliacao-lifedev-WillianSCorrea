import styles from './PostDetail.module.css';

export const PostCard = ({ post }) => {
  if (!post) return <div>Carregando...</div>;

  return (
    <div className={styles.postDetail}>
      <h3>{post.title}</h3>

      {/* Renderização condicional da imagem */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className={styles.postImage}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      )}

      <p className={styles.postBody}>{post.body}</p>

      {/* Renderização segura das tags */}
      <div className={styles.tags}>
        {post.tags?.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
