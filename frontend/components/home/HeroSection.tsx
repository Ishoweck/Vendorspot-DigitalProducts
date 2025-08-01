import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 font-display mb-6">
            Nigeria's Most Secure
            <span className="block text-primary-500">Digital Marketplace</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            Discover trusted vendors, shop a wide range of digital products, and
            enjoy instant delivery with secure payment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/vendors" className="btn-outline text-lg px-8 py-3">
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
