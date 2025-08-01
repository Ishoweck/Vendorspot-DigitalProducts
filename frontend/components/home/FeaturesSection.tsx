import { Shield, Zap, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Escrow protection ensures your money is safe until you receive your digital product.",
      bgColor: "bg-primary-100",
      iconColor: "text-primary-500",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description:
        "Get your digital products immediately after payment confirmation.",
      bgColor: "bg-success-100",
      iconColor: "text-success-500",
    },
    {
      icon: Users,
      title: "Trusted Vendors",
      description:
        "All vendors are verified and rated by our community of buyers.",
      bgColor: "bg-secondary-100",
      iconColor: "text-secondary-500",
    },
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 font-display mb-4">
            Why Choose Vendorspot?
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We provide a secure, reliable platform for buying and selling
            digital products with instant delivery and buyer protection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
