import "./CreatePost.module.css";
import{Link} from "react-router-dom";
import {useAuthValue} from '../../context/AuthContext';
import {useFetchDocuments} from '../../hooks/useFetchDocuments';
import {useDeleteDocument} from '../../hooks/useDeleteDocument';

const Dashboard = () => {
    const {user} = useAuthValue()
    const uid = user.uid
    const {documents: posts, loading} = useFetchDocuments('posts', null, uid)
    const {deleteDocument} = useDeleteDocument('posts')
    
    return (
        <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Gerencie seus posts</p>
        <div className="post-list">
            {loading && <p>Carregando...</p>}
            {posts && posts.length === 0 && (
            <div className="no-posts">
                <p>Não foram encontrados posts</p>
                <Link to="/create" className="btn">Criar seu Primeiro Post !</link>
            </div>
            ):(
                <div className="posts">
                    <h2>Meus Posts</h2>
                    <p>Veja os posts mais recentes</p>
                    <form className="search_form">
                        <input 
                        type="text"
                        placeholder='Ou busque por tags...' 
                        />
                        <button className="btn btn-dark">Pesquisar</button>
                    </form>
                </div>
                <div className="posts_header">
                    <span>Título</span>
                    <span>Ações</span>
                    {/* <span>Autor</span> */}
                </div>

                // <div className="posts">
                //     {posts && posts.map((post) => (
                //         <div className="post" key={post.id}>
                //             <h2>{post.title}</h2>
                //             <p>{post.createdBy}</p>
                //             <button onClick={() => deleteDocument(post.id)}>Excluir</button>
                //         </div>
                //     ))}

            )
            }   
            {posts && posts.map((post) => (
            <div className="post" key={post.id}>
                <h2>{post.title}</h2>
                <div className="actions">
                    <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                    <Link to={`/edit/${post.id}`} className="btn btn-dark">Editar</Link>
                <button onClick={() => deleteDocument(post.id)}>Excluir</button>
            </div>
            </div>
            ))}
        </div>
        </div>
        </div>
    )
    }
