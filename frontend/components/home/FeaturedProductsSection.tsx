import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Download, Heart } from "lucide-react";

export default function FeaturedProductsSection() {
  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium WordPress Theme",
      vendor: "TechVendor",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 124,
      downloads: 1200,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Web Templates",
    },
    {
      id: 2,
      name: "Digital Marketing Course",
      vendor: "EduPro",
      price: 99.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 89,
      downloads: 567,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      category: "Courses",
    },
    {
      id: 3,
      name: "Mobile App UI Kit",
      vendor: "DesignHub",
      price: 19.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviews: 203,
      downloads: 890,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      category: "Design Resources",
    },
    {
      id: 4,
      name: "Business Plan Template",
      vendor: "BizTools",
      price: 19.99,
      originalPrice: 39.99,
      rating: 4.6,
      reviews: 156,
      downloads: 445,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      category: "Business",
    },
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 font-display mb-2">
              Featured Products
            </h2>
            <p className="text-neutral-600">
              Handpicked digital products from our top vendors
            </p>
          </div>
          <Link href="/products" className="btn-outline">
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="card group hover:shadow-medium transition-shadow duration-200"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                    <Heart className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-500 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-2">
                  by {product.vendor}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-secondary-400 fill-current"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-neutral-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Download className="w-4 h-4 mr-1" />
                    {product.downloads}
                  </div>
                </div>

                <button className="w-full btn-primary">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
