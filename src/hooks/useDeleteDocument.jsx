import { useState, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"

const initialState = {
  loading: false,
  error: null
}
const deletereducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }
    case "ERROR":
      return { loading: false, error: action.payload }
    case "DELETED_DOC":
      return { loading: false, error: null }
    default:
      return state
  }
}

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deletereducer, initialState);
  const [cancelled, setCancelled] = useState(false)

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled)
      return
    dispatch(action)
  }

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" })
    try {
      const docRef = doc(db, docCollection, id)
      await deleteDoc(docRef)
      checkCancelBeforeDispatch({ type: "DELETED_DOC", payload: docRef })
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message })
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return { deleteDocument, response }
}