import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import api from '../services/api';
import './Products.css';

interface Product {
  _id?: string;
  id?: number;
  name: string;
  category: string;
  description: string;
  image?: string;
  img?: string; // Support both naming conventions from backend/static
  material?: string;
  warranty?: string;
  availability?: string;
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Ductless Fume Hood",
    category: "Safety Cabinets",
    description: "Advanced filtration system for safe chemical handling without external ducting.",
    img: "https://images.unsplash.com/photo-1581093141620-109249e327da?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Chemical Laboratory Bench",
    category: "Laboratory Furniture",
    description: "Durable workspace designed for chemical resistance and efficiency.",
    img: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Modular Laboratory Bench",
    category: "Laboratory Furniture",
    description: "Flexible and customizable lab furniture solutions.",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Granite Top Laboratory Bench",
    category: "Laboratory Furniture",
    description: "Heavy-duty bench with high durability and chemical resistance.",
    img: "https://images.unsplash.com/photo-1581093806221-7079373bc0c2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Chemical Air Blower",
    category: "Industrial Systems",
    description: "Efficient air circulation system for industrial and lab use.",
    img: "https://images.unsplash.com/photo-1581093583424-94c6f8515764?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Laboratory Air Blower",
    category: "Industrial Systems",
    description: "Compact blower for controlled lab airflow.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  }
];

const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  return (
    <motion.div
      className="product-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="product-modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.img || product.image} alt={product.name} />
          </div>
          <div className="modal-details">
            <span className="modal-badge">Premium Quality</span>
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>

            <div className="modal-specs">
              <div className="spec-item">
                <strong>Material:</strong> {product.material || 'High-grade Industrial Composite'}
              </div>
              <div className="spec-item">
                <strong>Warranty:</strong> {product.warranty || '12 Months Support'}
              </div>
              <div className="spec-item">
                <strong>Availability:</strong> {product.availability || 'Ready for Dispatch'}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Products: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get('/products');
        if (prodRes.data.length > 0) setProductsList(prodRes.data);
        
        const catRes = await api.get('/categories');
        setCategories(catRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="products-page">
      <header className="products-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            {activeCategory ? activeCategory : "Products & Services"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-intro"
          >
            {activeCategory 
              ? `Showing all products under ${activeCategory}` 
              : "Explore our wide range of laboratory and industrial solutions"}
          </motion.p>
        </div>
      </header>

      <section className="categories-section">
        <div className="container">
          <AnimatePresence mode="wait">
            {!activeCategory ? (
              <motion.div
                key="categories"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="categories-grid"
              >
                {categories.map((cat, i) => {
                  const count = productsList.filter(p => p.category === cat.name).length;
                  return (
                    <motion.div
                      key={i}
                      className="category-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      <div className="category-card-image">
                        <img 
                          src={cat.img} 
                          alt={cat.name} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800";
                          }}
                        />
                        <div className="category-card-overlay">
                          <span className="item-count">{count} Products</span>
                        </div>
                      </div>
                      <div className="category-card-info">
                        <h3>{cat.name}</h3>
                        <button className="category-view-btn">
                          View Products <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="products-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="category-products-view"
              >
                <div className="view-actions">
                  <button className="back-btn" onClick={() => setActiveCategory(null)}>
                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Categories
                  </button>
                </div>

                <div className="products-grid">
                  {productsList
                    .filter(p => p.category === activeCategory)
                    .map((product) => (
                      <motion.div
                        key={product._id || product.id}
                        className="product-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="product-image-wrapper">
                          <img src={product.img || product.image} alt={product.name} />
                          <span className="product-badge">Premium</span>
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          <div className="product-card-footer">
                            <button className="view-more-link">
                              View Details <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  {productsList.filter(p => p.category === activeCategory).length === 0 && (
                    <div style={{gridColumn: '1/-1', textAlign: 'center', padding: 40}}>
                      <p>No products found in this category yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
