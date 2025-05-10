

import "./CreatePost.module.css";
import { useState } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { serverTimestamp } from 'firebase/firestore'; // Importe aqui

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');
    const { user } = useAuthValue();
    const navigate = useNavigate();
    const { insertDocument, response } = useInsertDocument('posts');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        try {
            new URL(image);
        } catch (error) {
            setFormError('A imagem precisa ser uma URL válida.');
            return;
        }

        const tagsArray = tags.split(',')
            .map((tag) => tag.trim())
            .filter(tag => tag !== '');

        if (!title || !image || !body || tagsArray.length === 0) {
            setFormError('Por favor, preencha todos os campos!');
            return;
        }

        const post = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName || user.email,
            createdAt: serverTimestamp() // Usando timestamp correto
        };

        await insertDocument(post);

        if (!response.error) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="create-post">
            <h2>Criar Post</h2>
            <p>Crie seu post para compartilhar com a comunidade!</p>
            <p>Escreva sobre o Quiser e Compartilhe o seu Conhecimento</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense em um título..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <span>URL da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira uma imagem que representa o seu post..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vírgula"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </label>

                {!response.loading && <button className="btn">Criar Post</button>}
                {response.loading && (
                    <button className="btn" disabled>Aguarde...</button>
                )}
                {(response.error || formError) && (<p className="error">{response.error || formError}</p>
                )}
            </form>
        </div>
    )
}
export default CreatePost;