import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = () => {
    const products = useLoaderData();
    console.log(products);

    return (
        <div >
            <div className='grid my-8 gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <React.Fragment key={product._id}>

                        <ProductCard product={product}></ProductCard>

                    </React.Fragment>
                    )}


            </div>

        </div>
    );
};

export default Product;