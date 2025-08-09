import Link from "next/link";

export default function DigitalProductsSection() {
  const digitalProducts = [
    { id: 1, name: "How to run an effective ads", price: "N20,000" },
    { id: 2, name: "How to run an effective ads", price: "N20,000" },
    { id: 3, name: "How to run an effective ads", price: "N20,000" },
    { id: 4, name: "How to run an effective ads", price: "N20,000" },
    { id: 5, name: "How to run an effective ads", price: "N20,000" },
    { id: 6, name: "How to run an effective ads", price: "N20,000" },
    { id: 7, name: "How to run an effective ads", price: "N20,000" },
    { id: 8, name: "How to run an effective ads", price: "N20,000" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#D7195B]">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-4">
          Explore. Download. <span className="bg-black px-2">Grow.</span>
        </h2>
        <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Digital products made to fuel your business journey.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {digitalProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-full bg-white rounded-[5px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 h-80 sm:h-96 md:h-[420px] block"
              style={{ aspectRatio: "255/374" }}
            >
              <div
                className="bg-[#FFDD00] relative w-full"
                style={{ height: "72.2%" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                    <span className="text-xs sm:text-sm">Product Image</span>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-2 sm:p-3 md:py-4 md:px-[15px] flex flex-col space-y-1.5 sm:space-y-2"
                style={{ height: "27.8%" }}
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <h3
                    className="text-[#000000B2] font-inter font-normal line-clamp-2"
                    style={{ fontSize: "12px", lineHeight: "120%" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-black font-inter font-medium"
                    style={{ fontSize: "14px", lineHeight: "120%" }}
                  >
                    {product.price}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-[#FC5991]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span
                    className="text-[#000000B2] font-inter font-medium leading-none"
                    style={{ fontSize: "8px", lineHeight: "100%" }}
                  >
                    No review yet
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/view-products"
          className="inline-block bg-transparent text-white border-2 border-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white hover:text-[#D7195B] transition-colors duration-200 text-sm sm:text-base"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
