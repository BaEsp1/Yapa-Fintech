'use client';
import { UserPhotoDefault } from "@/assets";
import useForoStore from "@/store/foro/ForoStore";
import { Add, ArrowBackIos } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useEffect, useState } from "react";
import Image from "next/image";
import { CreatePost } from "../modal/foro/createPost";

export const ForoSection = () => {
    const { getCategorias, foroData, fetchData } = useForoStore();
    const allCategory = getCategorias();
    const [visual, setVisual] = useState(true);
    const [createPost, setCreatePost] = useState(false);
    const [categorySelect, setCategorySelect] = useState("");
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChange = (category: string) => {
      setVisual(false);
      setCategorySelect(category);
    };
  
    const handleBackCategory = () => {
      setVisual(true);
    };
  
    const handleOpen = () => {
      setCreatePost(true);
    };
  
    const handleClose = () => {
      setCreatePost(false);
    };
  
    const timeAgo = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
  
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
  
      if (diffInDays > 0) {
        return `Hace ${diffInDays} días`;
      } else if (diffInHours > 0) {
        return `Hace ${diffInHours} horas`;
      } else if (diffInMinutes > 0) {
        return `Hace ${diffInMinutes} min.`;
      } else {
        return `Hace unos segundos`;
      }
    };
  
    return (
      <div className="p-3 h-[40em] relative">
        {createPost && <CreatePost onClose={handleClose} category={categorySelect} />}
        {visual === true ? (
          <ul>
            {allCategory.length > 0 ? (
              allCategory.map((category) => (
                <li
                  key={category}
                  onClick={() => handleChange(category)}
                  className="flex flex-row justify-between items-center justify-center"
                >
                  <div className="flex flex-col p-2">
                    <h1 className="text-h5-semibold text-white900">{category}</h1>
                    <h2 className="text-p2-regular text-white600">
                      {foroData[category].length} entradas activas{" "}
                    </h2>
                  </div>
                  <ArrowForwardIosIcon />
                </li>
              ))
            ) : (
              <li className="text-accent400 text-p2-regular text-center">Cargando...</li>
            )}
          </ul>
        ) : (
          <div className="p-3 pt-1">
            <div className="flex flex-row gap-3 items-center" onClick={handleBackCategory}>
              <ArrowBackIos />
              <div className="flex flex-col p-2">
                <h1 className="text-h5-semibold text-white900">{categorySelect}</h1>
                <h2 className="text-p2-regular text-white600">
                  {foroData[categorySelect].length} entradas activas{" "}
                </h2>
              </div>
            </div>
            <ul>
              {foroData[categorySelect].map((item, index) => (
                <li key={index} className="flex flex-col p-3">
                  <span className="flex flex-row gap-2 items-center text-p1-medium text-white600">
                    <Image src={UserPhotoDefault} alt="" className="h-4 w-4" />
                    {item.autor} · <strong>{timeAgo(item.date)}</strong>{" "}
                  </span>
                  <h1 className="text-h6-semibold text-white900">{item.tittle}</h1>
                  <p className="text-p1-regular text-white600 py-1">{item.description}</p>
                  <span className="text-p1-semibold text-white900 pt-1 items-center">
                    <ChatBubbleOutlineOutlinedIcon /> {item.comments}{" "}
                    <StarOutlineOutlinedIcon className="text-accent400" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        { createPost === false ?
        <button
          className="h-[80px] w-[80px] bg-accent400 rounded-full fixed bottom-20 right-4 z-50"
          onClick={handleOpen} >
          <Add className="text-white" sx={{ fontSize: 50 }} />
        </button>
        : ""}
      </div>
    );
  };
  