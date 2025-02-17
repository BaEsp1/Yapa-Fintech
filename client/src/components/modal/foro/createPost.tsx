import Button from "@/components/ui/Button";
import { ArrowBackIos } from "@mui/icons-material";
import { useState } from "react";
import useForoStore from "@/store/foro/ForoStore";
import Swal from "sweetalert2"; 
import { useUserStore } from "@/store/user/userStore";

interface CreatePostProps {
  onClose: () => void;
  category: string | "";
}

export const CreatePost = ({ onClose, category }: CreatePostProps) => {

    const user = useUserStore ((state)=> state.user)
    const { getCategorias, addPost} = useForoStore();
    const autor = user.name +" "+user.lastName
    const [post, setPost] = useState({
        tittle: "",
        description: "",
        category: category,
        autor: autor || "Tu",
        text: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = () => {
    if (post.tittle && post.description && post.text) {
      addPost(post); 
          Swal.fire({
            title: '¡Posteo realizado!',
            text: 'Tu posteo se ha creado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
          });
      onClose();
    } else {
        Swal.fire({
        title: '¡Parece que falta algo!',
        text: 'Necesitas completar todos los campos para crear tu post',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg items-center w-[90%] h-[70%]">
        <button onClick={onClose} className="float-right p-2">
          <ArrowBackIos />
        </button>
        <h1 className="text-h5-semibold text-white900 py-2">Crea un post</h1>
        <p className="text-p3-regular text-white400 pb-2">
          Puedes compartir con otros usuarios tus experiencias, conocimientos, dudas o inseguridades.
        </p>
        <form className="py-2 flex flex-col gap-3 w-full">
          <label >
            <h1 className="text-p1-semibold text-white800">Categoría</h1>
            <select
              className="border border-white200 p-1 w-full rounded-lg shadow text-p1-regular text-white900"
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
            >
              {getCategorias().map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label>
            <h1 className="text-p1-semibold text-white800">Título</h1>
            <input
              type="text"
              name="tittle"
              value={post.tittle}
              onChange={handleChange}
              className="border border-white200 w-full p-1 rounded-lg shadow text-p1-regular text-white900"
            />
          </label>
          <label>
            <h1 className="text-p1-semibold text-white800">Resumen</h1>
            <input
              type="text"
              name="description"
              value={post.description}
              onChange={handleChange}
              className="border border-white200 p-1 w-full rounded-lg shadow text-p1-regular text-white900"
            />
          </label>
          <label>
            <h1 className="text-p1-semibold text-white800">Posteo</h1>
            <textarea
              name="text"
              value={post.text}
              onChange={handleChange}
              className=" h-[14em] border border-white200 p-1 w-full rounded-lg shadow text-p1-regular text-white900"
            ></textarea>
          </label>
        </form>
        <div className="flex justify-center w-full">
        <Button variant="solid" size="large"className="rounded-full " onClick={handleCreatePost}>
          Crear Post
        </Button>
        </div>
      </div>
    </div>
  );
};
