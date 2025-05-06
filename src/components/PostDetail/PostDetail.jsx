import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.created_by}>Criado por: {post.createdBy}</p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag} className={styles.tag}># {tag}</p>
        ))}
      </div>
      {/* <p className={styles.post_body}>{post.body}</p> */}
      <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler mais</Link>
    </div>
  )
}

export default PostDetail;