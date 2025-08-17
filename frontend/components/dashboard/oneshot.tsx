import { useState } from "react";
import { 
  Package, 
  Heart, 
  CreditCard, 
  Bell, 
  MapPin, 
  Settings, 
  Truck, 
  User, 
  Wallet,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Plus,
  Edit3
} from "lucide-react";

export default function DashboardTemplate() {
  const [dashboardType, setDashboardType] = useState("user");
  const [activeSection, setActiveSection] = useState("orders");

  const userSections = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "saved-items", label: "Saved Items", icon: Heart },
    { id: "payment-methods", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "shipping-address", label: "Shipping Address", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const vendorSections = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "profile", label: "Profile", icon: User },
    { id: "wallet", label: "Wallet", icon: Wallet }
  ];

  const currentSections = dashboardType === "user" ? userSections : vendorSections;
  const currentSection = currentSections.find(s => s.id === activeSection);

  const mockOrders = [
    {
      id: "ORD-001",
      orderNumber: "VS-2024-001",
      status: "DELIVERED",
      total: 129.98,
      createdAt: "2024-01-15T10:30:00Z",
      items: [
        {
          id: "1",
          name: "Premium WordPress Theme",
          vendor: "TechVendor",
          price: 29.99,
          downloadUrl: "https://example.com/download"
        }
      ]
    },
    {
      id: "ORD-002", 
      orderNumber: "VS-2024-002",
      status: "PROCESSING",
      total: 49.99,
      createdAt: "2024-01-20T14:15:00Z",
      items: [
        {
          id: "2",
          name: "Mobile App UI Kit",
          vendor: "DesignHub", 
          price: 49.99
        }
      ]
    }
  ];

  const mockSavedItems = [
    {
      id: 1,
      name: "Digital Marketing Course",
      vendor: "EduPro",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      name: "SEO Optimization Tool",
      vendor: "MarketingPro",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "PROCESSING":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600 bg-green-50";
      case "PROCESSING":
        return "text-yellow-600 bg-yellow-50";
      case "CANCELLED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Orders</h1>
              <div className="text-sm text-gray-500">
                {mockOrders.length} total orders
              </div>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-semibold text-gray-900">#{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ₦{order.total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-t border-gray-100">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">by {item.vendor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">₦{item.price.toLocaleString()}</span>
                          {order.status === "DELIVERED" && item.downloadUrl && (
                            <div className="flex gap-2">
                              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </button>
                              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "saved-items":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
              <div className="text-sm text-gray-500">
                {mockSavedItems.length} items saved
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSavedItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">by {item.vendor}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">₦{item.price.toLocaleString()}</span>
                    <button className="text-red-500 hover:text-red-700">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "payment-methods":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">**** **** **** 1234</p>
                      <p className="text-sm text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Default
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">**** **** **** 5678</p>
                      <p className="text-sm text-gray-500">Expires 08/25</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">Order Delivered</p>
                    <p className="text-blue-700 text-sm">Your order #VS-2024-001 has been delivered</p>
                  </div>
                  <span className="text-xs text-blue-600">2 hours ago</span>
                </div>
              </div>
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Payment Processed</p>
                    <p className="text-gray-700 text-sm">Payment for order #VS-2024-002 processed successfully</p>
                  </div>
                  <span className="text-xs text-gray-600">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "shipping-address":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Shipping Address</h1>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-gray-600">123 Main Street</p>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                    <p className="text-gray-600">+234 123 456 7890</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Default
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-gray-600">456 Office Complex</p>
                    <p className="text-gray-600">Abuja, Nigeria</p>
                    <p className="text-gray-600">+234 987 654 3210</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-700">Email Notifications</span>
                    <button className="bg-blue-600 w-12 h-6 rounded-full p-1 transition-colors">
                      <div className="bg-white w-4 h-4 rounded-full ml-6 transition-transform"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-700">SMS Notifications</span>
                    <button className="bg-gray-300 w-12 h-6 rounded-full p-1 transition-colors">
                      <div className="bg-white w-4 h-4 rounded-full transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-700">Profile Visibility</span>
                    <button className="bg-blue-600 w-12 h-6 rounded-full p-1 transition-colors">
                      <div className="bg-white w-4 h-4 rounded-full ml-6 transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Shipping Management</h1>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Shipping Rates</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Standard Delivery</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                  <span className="font-medium text-gray-900">₦2,000</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Express Delivery</p>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                  <span className="font-medium text-gray-900">₦5,000</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">TechVendor</h3>
                  <p className="text-gray-600">Premium Digital Products</p>
                  <p className="text-sm text-gray-500">Joined January 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input type="text" value="TechVendor" className="w-full border border-gray-300 rounded-md px-3 py-2" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value="vendor@techvendor.com" className="w-full border border-gray-300 rounded-md px-3 py-2" readOnly />
                </div>
              </div>
            </div>
          </div>
        );

      case "wallet":
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                <h3 className="font-semibold mb-2">Available Balance</h3>
                <p className="text-3xl font-bold">₦{(125450).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                <h3 className="font-semibold mb-2">This Month</h3>
                <p className="text-3xl font-bold">₦{(45200).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                <h3 className="font-semibold mb-2">Total Earnings</h3>
                <p className="text-3xl font-bold">₦{(890750).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Payment Received</p>
                    <p className="text-sm text-gray-500">Order #VS-2024-001</p>
                  </div>
                  <span className="font-medium text-green-600">+₦29,990</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Payment Received</p>
                    <p className="text-sm text-gray-500">Order #VS-2024-002</p>
                  </div>
                  <span className="font-medium text-green-600">+₦49,990</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{currentSection?.label}</h1>
            <p className="text-gray-600">Content for {currentSection?.label.toLowerCase()} will appear here.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => {
                setDashboardType("user");
                setActiveSection("orders");
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dashboardType === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              User Dashboard
            </button>
            <button
              onClick={() => {
                setDashboardType("vendor");
                setActiveSection("orders");
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dashboardType === "vendor" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Vendor Dashboard
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 bg-white rounded-lg shadow p-6">
            <nav className="space-y-2">
              {currentSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{section.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 bg-white rounded-lg shadow p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}