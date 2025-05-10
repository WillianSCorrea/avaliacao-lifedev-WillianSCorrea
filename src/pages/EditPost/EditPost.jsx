import styles from './EditPost.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument('posts', id);
    console.log(post);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);
            setTags(post.tags.join(','));
        }
    }
        , [post]);
    const { user } = useAuthValue();
    const navigate = useNavigate();
    const { updateDocument, response } = useUpdateDocument('posts');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');


        try {
            new URL(image);
        } catch (error) {
            setFormError('A imagem precisa ser uma URL.');
        }


        if (!title || !image || !body) {
            setFormError('Por favor, preencha todos os campos!');
            return;
        }


        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());



        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);


        navigate('/dashboard');

    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando Post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Pense em um bom título..."
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
                                placeholder="Insira as tags separadas por vírgula..."
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </label>

                        {!response.loading && <button className='btn'>Salvar</button>}
                        {response.loading && (
                            <button className='btn' disabled>Aguarde...</button>)}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )
            }
        </div>
    )
}
export default EditPost;