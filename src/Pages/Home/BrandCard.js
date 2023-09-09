import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const BrandCard = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('brands.json')
            .then(data => {

                const brandData = data.data;

                setBrands(brandData);
                setLoading(false);
            })

    }, [])



    return (
        <div className='grid  gap-6 grid-cols-1 lg:grid-cols-3'>

            {
                brands.map(brand =>

                    <Link to={`/product/${brand.BrandId}`} key={brand._id}>
                        <div className="card w-[80%] h-[70%] bg-slate-900  mx-auto mb-12 rounded-none mt-12 lg:-mt-12 z-10 flex  align-middle justify-center" style={{ boxShadow: '-5px 10px 18px #94a3b8' }}>
                            <div className="card-body w-[200px] h-[200px] mx-auto brightness-0 invert my-0 lg:my-12">
                                <img src={brand.image} alt="" />
                            </div>
                        </div>
                    </Link>
                )
            }


        </div>
    );
};

export default BrandCard;