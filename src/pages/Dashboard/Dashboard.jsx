import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
    const { user } = useAuthValue();
    const { documents: posts, loading } = useFetchDocuments("posts", null, user?.uid);
    const { deleteDocument } = useDeleteDocument('posts');

    if (loading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Gerencie seus posts</p>
            
            {!posts || posts.length === 0 ? (
                <div className={styles.no_posts}>
                    <p>Nenhum post encontrado</p>
                    <Link to="/posts/create" className={styles.btn}>
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <div className={styles.posts_container}>
                    <div className={styles.posts_header}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    
                    {posts.map((post) => (
                        <div className={styles.post_row} key={post.id}>
                            <h3>{post.title}</h3>
                            {post.createdAt?.seconds && (
                                <small>
                                    {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                                </small>
                            )}
                            <div className={styles.actions}>
                                <Link 
                                    to={`/posts/${post.id}`} 
                                    className={`${styles.btn} ${styles.btn_outline}`}
                                >
                                    Ver
                                </Link>
                                <Link 
                                    to={`/posts/edit/${post.id}`} 
                                    className={`${styles.btn} ${styles.btn_primary}`}
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => window.confirm('Tem certeza?') && deleteDocument(post.id)}
                                    className={`${styles.btn} ${styles.btn_danger}`}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;