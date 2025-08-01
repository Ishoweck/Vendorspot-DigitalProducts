import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white font-display mb-4">
          Ready to Start Selling?
        </h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of vendors who are already earning from their digital
          products on Vendorspot.
        </p>
        <Link href="/register" className="btn-secondary text-lg px-8 py-3">
          Become a Vendor
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
