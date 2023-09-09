import React from 'react';
import Banner from './Banner';
import BrandCard from './BrandCard';
import BestSeller from './BestSeller';
import RecentNews from './RecentNews';

const Home = () => {
    return (
        <div>
            <Banner />
            <BrandCard />
            <BestSeller />
            <RecentNews />
        </div>
    );
};

export default Home;