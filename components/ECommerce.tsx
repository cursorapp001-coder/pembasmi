import React from 'react';
import { User } from '../App';

interface ECommerceProps {
    onBack: () => void;
    user: User | null;
}

const ProductCard: React.FC<{ name: string; price: string; image: string; }> = ({ name, price, image }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600 mt-1">{price}</p>
            <button className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Add to Cart
            </button>
        </div>
    </div>
);

const ECommerce: React.FC<ECommerceProps> = ({ onBack, user }) => {
    const products = [
        { name: 'Buku Hukum Acara Pidana', price: 'Rp 150,000', image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=500' },
        { name: 'Jas Advokat Premium', price: 'Rp 1,200,000', image: 'https://images.unsplash.com/photo-1593032465175-3a339032aac5?w=500' },
        { name: 'Tas Kerja Kulit', price: 'Rp 750,000', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' },
        { name: 'Pulpen Mewah', price: 'Rp 300,000', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500' },
    ];
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 text-center">
                {user ? (
                    <h2 className="text-xl font-semibold">Selamat Datang, <span className="text-rose-600">{user.name}</span>!</h2>
                ) : (
                    <h2 className="text-xl font-semibold">Silakan Login untuk Berbelanja</h2>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product.name} {...product} />
                ))}
            </div>
        </>
    );
}

export default ECommerce;