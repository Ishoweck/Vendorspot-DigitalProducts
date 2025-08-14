export default function FeaturedShopsSection() {
  const featuredShops = [
    "Beauty Shop",
    "Phone Shop",
    "Bellaliz Store",
    "Rhoda Foods",
    "Kean Touch",
  ];

  return (
    <section className="bg-[#FF7300] w-full" style={{ marginTop: "41px" }}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        <h2 className="text-white font-bold text-2xl sm:text-3xl mb-7 text-left">
          Featured Shops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {featuredShops.map((shopName, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg hover:shadow-lg transition-shadow duration-200 w-full flex items-center justify-center ${index >= 2 ? "hidden sm:block" : ""}`}
              style={{
                borderRadius: "8px",
                aspectRatio: "227/203",
                maxWidth: "227px",
                margin: "0 auto",
              }}
            >
              <span className="text-gray-500 font-medium text-sm sm:text-base px-4">
                {shopName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
