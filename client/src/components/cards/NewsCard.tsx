import { CarsNews, CriptosNews, GlobalNews, MedicineNews, UserPhotoDefault } from "@/assets";
import { useNewsStore } from "@/store/community/news";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from "next/image";


export const NewsSection = () => {
type ImgType = 'Criptos' | 'Medicine' | 'Cars' | "Global"
const NewsMap: Record<ImgType, string> = {
  Criptos: CriptosNews, 
  Medicine: MedicineNews,
  Cars: CarsNews,
  Global: GlobalNews
};
  const { items } = useNewsStore();

  return (
    <div >
        <h1 className="text-h5-semibold text-white900 text-center pb-2">Noticias de Finanzas</h1>
      <div className=" flex flex-col">
        {Object.entries(items).map(([id, { img, title, message, autor, date, comments }]) => (
          <div key={id}>
            <Image src={NewsMap[img as ImgType] }alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />
          <div className="p-4">
            <div className= "flex flex-row text-p1-medium gap-2 text-white600 items-center">
                <Image src={UserPhotoDefault} alt="" className="w-4 h-4 "/>{autor + " · "} 
                <p className="text-p1-semibold">{date}</p>
            </div>
            <h3 className="text-white900 text-h5-semibold p-1">{title}</h3>
            <p className="text-white600 text-p1-regular p-1">{message}</p>

            <div className="flex flex-row justify-between p-1">
                <div className=" flex flex-row gap-2">
                    <ChatBubbleOutlineOutlinedIcon/>
                    {comments}
                </div>
                <div className=" flex flex-row gap-2">
                    <BookmarkBorderOutlinedIcon/>
                    <MoreHorizIcon/>
                </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
