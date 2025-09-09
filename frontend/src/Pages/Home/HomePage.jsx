import React, { useState, useEffect } from 'react';
import { ChevronRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';

import women from '../../Assets/women.jpg';
import men from '../../Assets/men.jpg';
import kids from '../../Assets/kids.jpg';
import hero1 from '../../Assets/hero1.jpg';
import hero2 from '../../Assets/hero2.jpg';
import hero3 from '../../Assets/hero3.jpg';


export default function Homepage() {
  const images = [hero1, hero2, hero3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-black mb-4">
              Style for Every{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Story
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover curated fashion for every member of your family — from women’s elegance to men’s sophistication and kids’ playful styles.
            </p>
            <div className="flex space-x-4 mb-12">
              <Link to="/products">
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:opacity-90 flex items-center transition">
                  Shop Now <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <button className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-100 transition">
                Explore Collections
              </button>
            </div>
            <div className="flex space-x-8">
              <div>
                <div className="text-2xl font-bold text-black">15K+</div>
                <div className="text-gray-600">Happy Families</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">1000+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">4.8</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-lg">
              <div className="w-full h-96 rounded-2xl overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt="Hero slideshow"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Explore{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Categories
              </span>
            </h2>
            <p className="text-gray-600">Find the perfect style</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: women, title: 'Women', link: 'women' },
              { img: men, title: 'Men', link: 'men' },
              { img: kids, title: 'Kids', link: 'kids' },
            ].map((cat, idx) => (
              <Link
                to={`/products/${cat.link}`}
                key={idx}
                className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow cursor-pointer block"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-semibold mb-1">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                StyleNest?
              </span>
            </h2>
            <p className="text-gray-600">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on orders over $50', bg: 'bg-rose-100', color: 'text-rose-600' },
              { icon: Shield, title: 'Secure Payment', desc: 'Your payment information is safe', bg: 'bg-blue-100', color: 'text-blue-500' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy', bg: 'bg-green-100', color: 'text-green-500' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help you', bg: 'bg-purple-100', color: 'text-purple-500' },
            ].map((item, i) => (
              <div className="text-center" key={i}>
                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}