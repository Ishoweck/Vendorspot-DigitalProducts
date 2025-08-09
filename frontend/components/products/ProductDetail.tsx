import Image from "next/image";
import { Star, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function ProductDetail() {
  return (
    <section>
      <div className="bg-white rounded-t-lg px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-start justify-between py-8 sm:py-12 md:py-16 lg:py-20 gap-6 sm:gap-8 lg:gap-12">
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/Product-img.png"
                alt="How to run an effect ads"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-none">
            <h1 className="text-black font-semibold text-[1.5rem] md:text-[1.875rem] lg:text-[2.125rem] xl:text-[2.5rem] leading-[1.2] font-inter mb-6 sm:mb-8 md:mb-[30px]">
              How to run an effect ads
            </h1>

            <div className="flex items-center gap-[7px] mb-12 sm:mb-16 md:mb-[60px]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#FC5991]"
                    fill="none"
                    stroke="currentColor"
                  />
                ))}
              </div>
              <span className="text-[#000000B2] font-inter text-sm">
                No review yet
              </span>
            </div>

            <div className="mb-6 sm:mb-8 md:mb-[24px]">
              <h3
                className="font-inter mb-3 sm:mb-4 md:mb-[14px]"
                style={{ fontSize: "16px", color: "#000000CC" }}
              >
                Product Description
              </h3>
              <p
                className="font-inter leading-relaxed"
                style={{ fontSize: "15px", color: "#000000CC" }}
              >
                Learn How to Run Effective Ads Master the art of creating ads
                that convert. From setting clear goals and choosing the right
                audience to crafting compelling visuals and tracking performance
                — this guide shows you how to run ads that actually deliver
                results for your business.
              </p>
            </div>

            <div className="mb-12 sm:mb-16 md:mb-[60px]">
              <p className="text-black font-inter text-lg font-medium">
                Price: N20,000
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-8 py-3 rounded-md font-medium transition-colors duration-200 mb-12 sm:mb-16 md:mb-[60px]"
              style={{
                border: "1.5px solid #D7195B",
                color: "#D7195B",
                backgroundColor: "transparent",
              }}
            >
              Add to Cart
            </button>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-[35px] items-start sm:items-center">
              <div
                className="px-4 py-3 rounded-lg"
                style={{ backgroundColor: "#FFF3F7" }}
              >
                <span style={{ color: "#585858" }}>Need Help? </span>
                <span style={{ color: "#D7195B", fontWeight: "600" }}>
                  Call 07045882161
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="font-inter text-sm font-medium"
                  style={{ color: "#9D9C9C" }}
                >
                  SHARE THIS PRODUCT
                </span>
                <div className="flex items-center gap-2">
                  <Facebook
                    className="w-4 h-4"
                    style={{ color: "#FC5991", fill: "#FC5991" }}
                  />
                  <svg className="w-4 h-4" fill="#FC5991" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <Instagram className="w-4 h-4" style={{ color: "#FC5991" }} />
                  <IconBrandWhatsapp
                    className="w-4 h-4"
                    style={{ color: "#FC5991" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-12 bg-[#D7195B] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h2
          className="text-white font-inter font-medium text-start mb-10"
          style={{ fontSize: "24px", lineHeight: "100%", fontWeight: 500 }}
        >
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="w-full bg-white rounded-[5px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 h-80 sm:h-96 md:h-[420px]"
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
                    How to run an effective ads
                  </h3>
                  <p
                    className="text-black font-inter font-medium"
                    style={{ fontSize: "14px", lineHeight: "120%" }}
                  >
                    N20,000
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
            </div>
          ))}
        </div>
      </div>

      <div className="my-[60px]">
        <h2
          className="text-black font-inter font-medium text-start mb-4"
          style={{ fontSize: "24px", lineHeight: "100%", fontWeight: 500 }}
        >
          You may also earn by selling this
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="h-80 sm:h-96 md:h-[380px] shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-[#9D9C9C]"
              style={{ width: "306px", maxWidth: "100%" }}
            >
              <div className="relative">
                <Image
                  src="/images/product.png"
                  alt="Product Name"
                  width={400}
                  height={300}
                  className="w-full object-cover h-48 sm:h-56 md:h-60"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <button className="p-1.5 sm:p-2 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex flex-col space-y-2 h-32 sm:h-40 md:h-[140px]">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
                    Product Name
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-base sm:text-lg font-bold text-neutral-900">
                        ₦20,000
                      </span>
                      <span className="text-sm text-neutral-500 line-through">
                        ₦20,000
                      </span>
                    </div>
                    <div className="bg-[#D7195B33] rounded px-2 py-1 text-xs">
                      <span className="text-[#D7195B] font-medium">-73%</span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600">
                    Shop Name - Location
                  </p>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-[#FC5991] mr-1"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
