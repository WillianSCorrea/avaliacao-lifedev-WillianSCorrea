import styles from"./Dashboard.module.css";
import{Link} from "react-router-dom";
import {useAuthValue} from '../../context/AuthContext';
import {useFetchDocuments} from '../../hooks/useFetchDocuments';
import {useDeleteDocument} from '../../hooks/useDeleteDocument';

const Dashboard = () => {
    const {user} = useAuthValue()
    const uid = user.uid
    const {documents: posts} = useFetchDocuments('posts', null, uid)
    const {deleteDocument} = useDeleteDocument('posts')
    
    

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Gerencie seus posts</p>
            <div className={styles.post_list}>
                {posts && posts.length === 0 ? (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">Criar seu Primeiro Post !</Link>
                    </div>
                ) : (
                    
                        <div className={styles.posts_header}>
                            <span>Título</span>
                            <span>Ações</span>
                        </div>
                        )
                    }
                        {posts.map((post) => (
                            <div className={styles.post_row} key={post.id}>
                                <h2>{post.title}</h2>
                                <div className={styles.actions}>
                                    <Link to={`/posts/${post.id}`} className="btn btn-outline">
                                        Ver
                                    </Link>
                                    <Link to={`/posts/edit/${post.id}`} className="btn btn-dark">
                                        Editar
                                    </Link>
                                    <button 
                                        onClick={() => deleteDocument(post.id)}
                                        className="btn btn-danger"
                                       
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    
                
            </div>
        </div>
    );
};

export default Dashboard;