import Image from "next/image";
import { CrownIcon, ShieldIcon, PointsIcon, BookIcon, PadlokIcon, SumIcon, BookImg, PadlokImg ,SumImg, ClockIcon, CreditCardIcon, CreditCardImg, ClockImg } from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useEducationStore from "@/store/community/education";
import Link from "next/link";

type ImgType = 'book' | 'padlock' | 'Sum' | "CreditCard" | "Clock";

const imageMap: Record<ImgType, string> = {
  book: BookImg, 
  padlock: PadlokImg,
  Sum: SumImg,
  CreditCard: CreditCardImg,
  Clock : ClockImg
};

export const CarouselComunnity = () => {
  const { items } = useEducationStore();
    let icon = ""

  return (
    <div className="h-[33em] pt-4">
      <div className=" w-[23.5em] mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={150}
          slidesPerView={3}
          centeredSlides={true}
          autoplay={{delay: 5000}}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
          }}
        >
          {Object.entries(items).map(([id, { img, title, message , levels , levelUser}]) => {

            if (img === "book") icon = BookIcon ;
            if (img === "padlock") icon = PadlokIcon;
            if (img === "Sum") icon = SumIcon ;
            if (img === "Clock") icon = ClockIcon;
            if (img=== "CreditCard") icon = CreditCardIcon

            return (
              <SwiperSlide key={id}>
              {/* <Link href={`/app/community/game/${id}`}></Link> */}
                <Link href={`/app/community/game/1`}>
                <div
                  className={`bg-primary100 flex flex-col w-[10em] h-[22em] gap-4 rounded-3xl justify-center p-4`}
                >
                  <Image
                    src={imageMap[img as ImgType] }
                    alt={title}
                    className="w-15 h-15"
                  />
                  <h1 className="text-whitw900 text-p1-bold  w-[7.7em]">{title}</h1>
                  <p className= "text-p3-medium text-white500 h-[40vh]">{message}</p>
                  <Image
                    src={icon}
                    alt={title}
                    className="mb-[-1.4em] w-full h-[10vh]"
                  />
                  <label className="text-white900 text-p3-medium mt-[-2em] ml-9">{levels + " · " }{levelUser}</label>
                </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex p-6 flex-row justify-center gap-5 text-p2-semibold text-white500">
        <button className="flex flex-row gap-1 justify-center items-center text-white500">
          <Image src={CrownIcon} alt="Ranking" />
          Ranking
        </button>

        <button className="flex flex-col justify-center items-center">
          <Image src={PointsIcon} alt="Puntos ganados" />
          Puntos ganados
        </button>

        <button className="flex flex-row gap-1 justify-center items-center">
          <Image src={ShieldIcon} alt="Divisiones" />
          Divisiones
        </button>
      </div>
    </div>
  );
};
