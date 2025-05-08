import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id || !docCollection) {
        setError('ID ou coleção não fornecidos');
        return;
      }

      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Documento não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [docCollection, id]);

  return { document, loading, error };
};
