import phoneImage from "@/assets/product-phone.jpg";
import headphonesImage from "@/assets/product-headphones.jpg";
import laptopImage from "@/assets/product-laptop.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  isOnSale?: boolean;
  isFeatured?: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Flagship Smartphone",
    price: 899.99,
    originalPrice: 1099.99,
    image: phoneImage,
    rating: 4.8,
    reviewCount: 234,
    category: "Smartphones",
    description: "Experience the latest in mobile technology with our premium flagship smartphone. Featuring a stunning display, advanced camera system, and lightning-fast performance.",
    features: [
      "6.7-inch OLED Display",
      "Triple Camera System",
      "5G Connectivity",
      "All-day Battery Life",
      "Wireless Charging",
      "Water Resistant"
    ],
    specifications: {
      "Display": "6.7-inch OLED, 120Hz",
      "Processor": "Latest A-series chip",
      "Storage": "256GB",
      "Camera": "48MP + 12MP + 12MP",
      "Battery": "4000mAh",
      "OS": "Latest Mobile OS"
    },
    isOnSale: true,
    isFeatured: true,
    stock: 45
  },
  {
    id: "2",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    image: headphonesImage,
    rating: 4.6,
    reviewCount: 189,
    category: "Audio",
    description: "Immerse yourself in superior sound quality with our premium wireless headphones. Advanced noise-cancellation technology meets exceptional comfort.",
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Quick Charge Technology",
      "Premium Comfort Design",
      "Multi-device Connectivity",
      "Voice Assistant Compatible"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours (ANC on)",
      "Charging Time": "2 hours (full charge)",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack"
    },
    isOnSale: true,
    isFeatured: true,
    stock: 32
  },
  {
    id: "3",
    name: "Ultra-Thin Professional Laptop",
    price: 1299.99,
    image: laptopImage,
    rating: 4.7,
    reviewCount: 156,
    category: "Laptops",
    description: "Power through your work with our ultra-thin professional laptop. Combining portability with performance for the modern professional.",
    features: [
      "14-inch Retina Display",
      "All-day Battery Life",
      "Lightweight Design",
      "Fast SSD Storage",
      "Multiple Ports",
      "Backlit Keyboard"
    ],
    specifications: {
      "Display": "14-inch Retina, 2560x1600",
      "Processor": "M2 Pro chip",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Battery": "Up to 18 hours",
      "Weight": "1.4kg"
    },
    isFeatured: true,
    stock: 18
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    price: 329.99,
    originalPrice: 399.99,
    image: phoneImage, // Using phone image as placeholder
    rating: 4.5,
    reviewCount: 298,
    category: "Wearables",
    description: "Track your fitness goals and stay connected with our advanced smart fitness watch. Health monitoring meets smart connectivity.",
    features: [
      "Health Monitoring",
      "GPS Tracking",
      "Water Resistant",
      "7-day Battery",
      "Sleep Tracking",
      "Smart Notifications"
    ],
    specifications: {
      "Display": "1.9-inch Always-on Retina",
      "Health Sensors": "Heart Rate, Blood Oxygen, ECG",
      "Battery": "Up to 7 days",
      "Water Resistance": "50 meters",
      "GPS": "Built-in GPS + Cellular",
      "Storage": "32GB"
    },
    isOnSale: true,
    stock: 67
  },
  {
    id: "5",
    name: "Gaming Mechanical Keyboard",
    price: 159.99,
    image: headphonesImage, // Using headphones image as placeholder
    rating: 4.4,
    reviewCount: 445,
    category: "Gaming",
    description: "Elevate your gaming experience with our premium mechanical keyboard. Tactile switches meet customizable RGB lighting.",
    features: [
      "Mechanical Switches",
      "RGB Backlighting",
      "Programmable Keys",
      "Gaming Mode",
      "USB-C Connection",
      "Detachable Cable"
    ],
    specifications: {
      "Switch Type": "Cherry MX Red",
      "Key Layout": "Full-size (104 keys)",
      "Backlighting": "Per-key RGB",
      "Polling Rate": "1000Hz",
      "Connection": "USB-C to USB-A",
      "Dimensions": "440 x 135 x 35mm"
    },
    stock: 89
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    image: laptopImage, // Using laptop image as placeholder
    rating: 4.3,
    reviewCount: 521,
    category: "Audio",
    description: "Take your music anywhere with our portable Bluetooth speaker. Powerful sound in a compact, travel-friendly design.",
    features: [
      "360° Sound",
      "Waterproof Design",
      "12-hour Battery",
      "Voice Assistant",
      "Party Connect",
      "Compact Design"
    ],
    specifications: {
      "Output Power": "20W",
      "Frequency Response": "65Hz - 20kHz",
      "Battery Life": "12 hours",
      "Connectivity": "Bluetooth 5.0",
      "Water Rating": "IPX7",
      "Dimensions": "210 x 60 x 60mm"
    },
    isOnSale: true,
    stock: 156
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const saleProducts = products.filter(product => product.isOnSale);