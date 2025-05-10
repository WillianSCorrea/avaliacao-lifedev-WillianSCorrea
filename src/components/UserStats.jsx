import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useAuthValue } from '../context/AuthContext';
import styles from './UserStats.module.css';

export const UserStats = () => {
  const { user } = useAuthValue();
  const { documents: posts, loading } = useFetchDocuments('posts', null, user?.uid);

  // Cálculo das estatísticas
  const calculateStats = () => {
    if (!posts || posts.length === 0) return null;

    const totalPosts = posts.length;
    const totalTags = posts.reduce((acc, post) => acc + (post.tags?.length || 0), 0);
    const lastPostDate = new Date(
      Math.max(...posts.map(post => post.createdAt?.seconds * 1000))
    ).toLocaleDateString();
    const mostUsedTag = posts
      .flatMap(post => post.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

    const topTag = Object.entries(mostUsedTag).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Nenhuma';

    return {
      totalPosts,
      totalTags,
      lastPostDate,
      topTag
    };
  };

  const stats = calculateStats();

  if (loading) return <div className={styles.loading}>Carregando estatísticas...</div>;

  return (
    <div className={styles.statsContainer}>
      <h3>📈 Suas Estatísticas</h3>

      {stats ? (
        <div className={styles.statsGrid}>
          <StatCard
            icon="📝"
            title="Posts"
            value={stats.totalPosts}
          />
          <StatCard
            icon="🏷️"
            title="Tags Usadas"
            value={stats.totalTags}
          />
          <StatCard
            icon="🔄"
            title="Último Post"
            value={stats.lastPostDate}
          />
          <StatCard
            icon="⭐"
            title="Tag Mais Usada"
            value={stats.topTag}
          />
        </div>
      ) : (
        <p className={styles.noPosts}>Nenhum post encontrado para calcular estatísticas.</p>
      )}
    </div>
  );
};


const StatCard = ({ icon, title, value }) => (
  <div className={styles.statCard}>
    <span className={styles.icon}>{icon}</span>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);