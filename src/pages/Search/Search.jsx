import styles from './Search.module.css';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';
import PostDetail from '../../components/PostDetail/PostDetail';

const Search = () => {
    const query = useQuery();
    const search = query.get("q");
    const { documents: posts } = userFetchDocuments("posts", search);
    return (
        <div className={styles.search_container}>
            <h2 className="page_title">Resultados para: {search}</h2>
            <div className={styles.search_results}>
                {posts && posts.length === 0 && (
                    <div className={styles.no_results}>
                        <p>Não foram encontrados resultados para a sua pesquisa.</p>
                        <Link to="/posts/create" className="btn btn-dark">Criar primeiro post</Link>
                    </div>
                )}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
            </div>
        </div>
    )
}
export default Search;