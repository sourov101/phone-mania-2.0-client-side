import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const RecentNews = () => {
    const stories = [
        {
            id: 1,
            title: 'Apple and Samsung laughing; Sony wants new $500 camera to replace your iPhone, Galaxy! ',
            author: 'Martin Filipov',
            image: 'https://m-cdn.phonearena.com/images/article/143747-wide-two_940/Apple-and-Samsung-laughing-Sony-wants-new-500-camera-to-replace-your-iPhone-Galaxy.webp?1668947676',

        },
        {
            id: 2,
            title: 'Why get an impostor when you can get Note 20 Ultra with SD slot for crazy low price ',
            author: 'Anam Hamid',
            image: 'https://m-cdn.phonearena.com/images/article/143808-wide-two_940/Why-get-an-impostor-when-you-can-get-Note-20-Ultra-with-SD-slot-for-crazy-low-price.webp?1668897587',

        },
        {
            id: 3,
            title: 'Jaw-dropping Pixel Fold, first foldable to challenge Galaxy Z Fold - Android, iPhone users react!',
            author: 'Martin Filipov',
            image: 'https://m-cdn.phonearena.com/images/article/143689-wide-two_940/Jaw-dropping-Pixel-Fold-first-foldable-to-challenge-Galaxy-Z-Fold---Android-iPhone-users-react.webp?1668959966',

        },
        {
            id: 4,
            title: 'Apple and Samsung laughing; Sony wants new $500 camera to replace your iPhone, Galaxy! ',
            author: 'Martin Filipov',
            image: 'https://m-cdn.phonearena.com/images/article/143747-wide-two_940/Apple-and-Samsung-laughing-Sony-wants-new-500-camera-to-replace-your-iPhone-Galaxy.webp?1668947676',

        },
        {
            id: 5,
            title: 'Why get an impostor when you can get Note 20 Ultra with SD slot for crazy low price ',
            author: 'Anam Hamid',
            image: 'https://m-cdn.phonearena.com/images/article/143808-wide-two_940/Why-get-an-impostor-when-you-can-get-Note-20-Ultra-with-SD-slot-for-crazy-low-price.webp?1668897587',

        },
        {
            id: 6,
            title: 'Jaw-dropping Pixel Fold, first foldable to challenge Galaxy Z Fold - Android, iPhone users react!',
            author: 'Martin Filipov',
            image: 'https://m-cdn.phonearena.com/images/article/143689-wide-two_940/Jaw-dropping-Pixel-Fold-first-foldable-to-challenge-Galaxy-Z-Fold---Android-iPhone-users-react.webp?1668959966',

        },

    ]

    return (
        <>
            <div className='mt-36 ml-10  '>
                <h1 className='text-[50px] font-bold text-slate-900 '>Popular Stories</h1>
            </div>

            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}

                className="mySwiper"
            >

                <div>
                    {
                        stories.map(story => <SwiperSlide key={story.id}>

                            <div className="card w-auto bg-slate-900 text-white shadow-xl rounded-none my-12">
                                <figure ><img src={story.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-sm lg:text-xl">
                                        {story.author}
                                        <div className="badge badge-secondary hidden lg:block md:block  text-sm">NEW</div>
                                    </h2>
                                    <p className='truncate lg:break-normal'>{story.title}</p>
                                </div>
                            </div>

                        </SwiperSlide>)
                    }
                </div>

            </Swiper >
        </>
    );
};

export default RecentNews;