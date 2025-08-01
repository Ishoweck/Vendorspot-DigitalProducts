import Link from "next/link";

export default function CategoriesSection() {
  const categories = [
    { name: "Web Templates", icon: "🌐", count: 150 },
    { name: "Digital Courses", icon: "📚", count: 89 },
    { name: "Design Resources", icon: "🎨", count: 234 },
    { name: "Business Tools", icon: "💼", count: 67 },
    { name: "Mobile Apps", icon: "📱", count: 123 },
    { name: "Graphics", icon: "🖼️", count: 456 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 font-display mb-4">
            Popular Categories
          </h2>
          <p className="text-neutral-600">
            Explore thousands of digital products across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products?category=${category.name}`}
              className="card p-6 text-center hover:shadow-medium transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-neutral-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-500">
                {category.count} products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
