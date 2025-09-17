import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShoppingBag, Users, Award, Truck } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sofa Minimalis Modern",
    price: "Rp 3.500.000",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Sofa 3 dudukan dengan desain minimalis dan material berkualitas tinggi",
    category: "Sofa"
  },
  {
    id: 2,
    name: "Meja Makan Kayu Jati",
    price: "Rp 4.200.000",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Meja makan solid kayu jati untuk 6 orang dengan finishing natural",
    category: "Meja"
  },
  {
    id: 3,
    name: "Lemari Pakaian 3 Pintu",
    price: "Rp 2.800.000",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Lemari pakaian modern dengan 3 pintu dan laci penyimpanan",
    category: "Lemari"
  },
  {
    id: 4,
    name: "Kursi Kantor Ergonomis",
    price: "Rp 1.250.000",
    image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Kursi kantor dengan sandaran punggung ergonomis dan adjustable height",
    category: "Kursi"
  },
  {
    id: 5,
    name: "Tempat Tidur Queen Size",
    price: "Rp 3.900.000",
    image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Tempat tidur queen size dengan headboard berlapis dan frame kayu solid",
    category: "Tempat Tidur"
  },
  {
    id: 6,
    name: "Rak Buku Minimalis",
    price: "Rp 1.800.000",
    image: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Rak buku 5 tingkat dengan desain minimalis dan material MDF berkualitas",
    category: "Rak"
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Wahena Furniture</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-emerald-600 transition-colors">
                Beranda
              </button>
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-emerald-600 transition-colors">
                Produk
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-emerald-600 transition-colors">
                Tentang Kami
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-emerald-600 transition-colors">
                Kontak
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-emerald-600 py-2 text-left">
                  Beranda
                </button>
                <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-emerald-600 py-2 text-left">
                  Produk
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-emerald-600 py-2 text-left">
                  Tentang Kami
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-emerald-600 py-2 text-left">
                  Kontak
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Furniture Berkualitas untuk 
              <span className="text-emerald-600"> Rumah Impian</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Wahena Furniture menyediakan perabot rumah tangga berkualitas tinggi dengan desain modern dan harga terjangkau
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('products')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Lihat Produk
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Produk Unggulan Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Koleksi furniture pilihan dengan kualitas terbaik dan desain yang memukau
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wahena Furniture telah dipercaya selama bertahun-tahun sebagai penyedia furniture berkualitas tinggi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mengapa Memilih Wahena Furniture?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sejak didirikan pada tahun 2010, Wahena Furniture telah menjadi pilihan utama keluarga Indonesia untuk kebutuhan perabot rumah tangga. Kami berkomitmen menyediakan produk berkualitas tinggi dengan harga yang terjangkau.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tim ahli kami terdiri dari desainer berpengalaman dan pengrajin terampil yang memastikan setiap produk dibuat dengan standar kualitas tertinggi. Kepuasan pelanggan adalah prioritas utama kami.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">5000+</h4>
                  <p className="text-gray-600 text-sm">Pelanggan Puas</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">15+</h4>
                  <p className="text-gray-600 text-sm">Tahun Pengalaman</p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">100%</h4>
                  <p className="text-gray-600 text-sm">Garansi Kualitas</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Showroom Wahena Furniture"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-emerald-600 mb-1">Showroom</h4>
                <p className="text-gray-600">Modern & Nyaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kontak Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi gratis dan penawaran terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Alamat Showroom</h4>
                    <p className="text-gray-600">
                      Jl. Furniture Raya No. 123<br />
                      Kelurahan Maju, Kota Bandung<br />
                      Jawa Barat 40123
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                    <p className="text-gray-600">+62 22 1234 5678</p>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@wahenafurniture.com</p>
                    <p className="text-gray-600">sales@wahenafurniture.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Jam Operasional</h4>
                <div className="text-gray-600 space-y-1">
                  <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                  <p>Sabtu - Minggu: 09.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Konsultasi Produk</option>
                    <option>Permintaan Penawaran</option>
                    <option>Layanan Purna Jual</option>
                    <option>Keluhan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Tuliskan pesan Anda..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-400" />
                <h3 className="text-xl font-bold">Wahena Furniture</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Menyediakan furniture berkualitas tinggi untuk rumah impian Anda sejak 2010.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sofa & Kursi</li>
                <li>Meja & Lemari</li>
                <li>Tempat Tidur</li>
                <li>Rak & Storage</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Konsultasi Gratis</li>
                <li>Custom Design</li>
                <li>Pengiriman</li>
                <li>Pemasangan</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
              <p className="text-gray-400 mb-4">Dapatkan update produk terbaru</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700">
                  <span className="text-sm font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                  <span className="text-sm font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700">
                  <span className="text-sm font-bold">WA</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Wahena Furniture. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;