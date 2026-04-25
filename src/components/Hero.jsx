const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-heading font-bold leading-tight text-gray-900 mb-6">
              Gourmet Speed.
              <br />
              <span className="text-primary">Seamless Dining.</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 max-w-lg mx-auto lg:mx-0">
              Experience fine dining without the wait. Order ahead, book your table, or get your favorite dishes delivered hot and fresh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition-all hover:shadow-xl">
                🚀 Fast Pick-up
              </button>
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:scale-105 transition-all hover:bg-orange-50">
                📅 Book Table
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-500">Mins Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-gray-500">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-500">Happy Diners</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Gourmet Food"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Order Confirmed</div>
                  <div className="text-sm text-gray-500">Est. 12 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;