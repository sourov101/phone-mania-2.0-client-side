import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";


// Import Swiper styles
import 'swiper/css';
import img1 from '../../assets/images/banner (1).jpg';
import img2 from '../../assets/images/banner (2).jpg';
import img3 from '../../assets/images/banner (3).jpg';
import img4 from '../../assets/images/banner (4).jpg';
import img5 from '../../assets/images/banner (5).jpg';
import './Banner.css';
const Banner = () => {
    return (
        <div className="">

            <Swiper className='relative group'

                navigation={{
                    nextEl: '.button-next-slide',
                    prevEl: '.button-prev-slide',
                }}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                modules={[Autoplay, Navigation]}


            >
                <SwiperSlide >
                    <div className='image bg-gradient-to-r from-slate-900 to-slate-300'>
                        <img src={img1} alt="" className='w-full h-[700px] lg:h-[580px] mix-blend-overlay' />
                        <div className="title-content absolute top-[40%] lg:top-[25%]  left-[4rem]">
                            <h3 className='text-white text-[20px] lg:text-[50px] w-[80%] font-bold '>Buy Your Favourite Phone !!!</h3>
                            <p className='text-white text-[9px] lg:text-[16px] w-50% lg:w-[40%] font-medium'>Buy your favourite phone at lowest price. Enjoy your dream phones. Explore more</p>
                            <button className='mt-2 lg:mt-4 px-[1.5rem] lg:px-[3rem] bg-slate-900 text-[10px] lg:text-[13px] p-2 text-white text-lg font-bold'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='image bg-gradient-to-r from-slate-900 to-slate-300'>
                        <img src={img2} alt="" className='w-full h-[700px] lg:h-[580px] mix-blend-overlay' />
                        <div className="title-content absolute top-[40%] lg:top-[25%]  left-[4rem]">
                            <h3 className='text-white text-[20px] lg:text-[50px] w-[80%] font-bold '>Buy Your Favourite Phone !!!</h3>
                            <p className='text-white text-[9px] lg:text-[16px] w-50% lg:w-[40%] font-medium'>Buy your favourite phone at lowest price. Enjoy your dream phones. Explore more</p>
                            <button className='mt-2 lg:mt-4 px-[1.5rem] lg:px-[3rem] bg-slate-900 text-[10px] lg:text-[13px] p-2 text-white text-lg font-bold'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='image bg-gradient-to-r from-slate-900 to-slate-300'>
                        <img src={img3} alt="" className='w-full h-[700px] lg:h-[580px] mix-blend-overlay' />
                        <div className="title-content absolute top-[40%] lg:top-[25%]  left-[4rem]">
                            <h3 className='text-white text-[20px] lg:text-[50px] w-[80%] font-bold '>Buy Your Favourite Phone !!!</h3>
                            <p className='text-white text-[9px] lg:text-[16px] w-50% lg:w-[40%] font-medium'>Buy your favourite phone at lowest price. Enjoy your dream phones. Explore more</p>
                            <button className='mt-2 lg:mt-4 px-[1.5rem] lg:px-[3rem] bg-slate-900 text-[10px] lg:text-[13px] p-2 text-white text-lg font-bold'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >


                    <div className='image bg-gradient-to-r from-slate-900 to-slate-300'>
                        <img src={img4} alt="" className='w-full h-[700px] lg:h-[580px] mix-blend-overlay' />
                        <div className="title-content absolute top-[40%] lg:top-[25%]  left-[4rem]">
                            <h3 className='text-white text-[20px] lg:text-[50px] w-[80%] font-bold '>Buy Your Favourite Phone !!!</h3>
                            <p className='text-white text-[9px] lg:text-[16px] w-50% lg:w-[40%] font-medium'>Buy your favourite phone at lowest price. Enjoy your dream phones. Explore more</p>
                            <button className='mt-2 lg:mt-4 px-[1.5rem] lg:px-[3rem] bg-slate-900 text-[10px] lg:text-[13px] p-2 text-white text-lg font-bold'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >

                    <div className='image bg-gradient-to-r from-slate-900 to-slate-300'>
                        <img src={img5} alt="" className='w-full h-[700px] lg:h-[580px] mix-blend-overlay' />
                        <div className="title-content absolute top-[40%] lg:top-[25%]  left-[4rem]">
                            <h3 className='text-white text-[20px] lg:text-[50px] w-[80%] font-bold '>Buy Your Favourite Phone !!!</h3>
                            <p className='text-white text-[9px] lg:text-[16px] w-50% lg:w-[40%] font-medium'>Buy your favourite phone at lowest price. Enjoy your dream phones. Explore more</p>
                            <button className='mt-2 lg:mt-4 px-[1.5rem] lg:px-[3rem] bg-slate-900 text-[10px] lg:text-[13px] p-2 text-white text-lg font-bold shadow-lg'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>

                <div className='top-[50%] absolute z-10 button-next-slide group-hover:left-0 -left-[23rem] duration-500 w-[40px] h-[40px] text-white bg-slate-900 grid place-items-center'>
                    <BiLeftArrow /></div>
                <div className='top-[50%] absolute z-10 button-prev-slide group-hover:right-0 -right-[23rem] duration-500 w-[40px] h-[40px] text-white bg-slate-900 grid place-items-center'>
                    <BiRightArrow /></div>


            </Swiper>


        </div>
    );
};

export default Banner;