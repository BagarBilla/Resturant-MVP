import { useState, useRef, useEffect } from 'react';
import { menuCategories, menuItems } from '../data/menuData';
import { useOrder } from '../context/OrderContext';

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const categoryRefs = useRef([]);
  const containerRef = useRef(null);
  const { dispatch } = useOrder();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (category) => {
    const element = categoryRefs.current.find(
      (ref) => ref && ref.dataset.category === category
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Menu</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar / Mobile Top Chips */}
          <div className="lg:w-64 lg:sticky lg:top-20 lg:self-start">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 no-scrollbar">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all hover:scale-105 ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1">
            {menuCategories.map((category, categoryIndex) => (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[categoryIndex] = el)}
                data-category={category}
                className="mb-12"
              >
                <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-800">
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-heading font-semibold text-lg text-gray-900">
                              {item.name}
                            </h4>
                            <span className="font-bold text-primary">₹{item.price}</span>
                          </div>
                          <p className="text-gray-500 text-sm font-body mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-full py-3 bg-orange-50 text-primary font-semibold rounded-xl hover:bg-primary hover:text-black transition-all hover:scale-105"
                          >
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;