// hooks/useFetchDocuments.js
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  where 
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        let q;
        const collectionRef = collection(db, docCollection);

        // Consulta para Dashboard (posts do usuário)
        if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } 
        // Consulta para Home (todos os posts)
        else {
          q = query(
            collectionRef,
            orderBy("createdAt", "desc")
          );
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(results);
          setLoading(false);
        }, (error) => {
          setError(error.message);
          setLoading(false);
        });

        return () => unsubscribe();

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};