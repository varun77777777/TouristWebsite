import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, MapPin, QrCode, Utensils, Shield, Compass, Globe, Sparkles } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'AI Planner', href: '/planner', icon: Sparkles },
    { name: 'Scanner', href: '/scanner', icon: QrCode },
    { name: 'Food Guide', href: '/food', icon: Utensils },
    { name: 'Emergency', href: '/emergency', icon: Shield }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-black/10 shadow-sm">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Image
                  src="https://static.wixstatic.com/media/931b1e_d30c8d4239e144018ca611b3f2f911d8~mv2.jpg"
                  alt="Sukhi Sanchari Logo - Travel companion with headphones and world landmarks"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-heading text-black text-xl tracking-wide">{"SUKHI SANCHARI"}</h1>
                <p className="font-paragraph text-xs text-black/60">Heritage Travel Companion</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-paragraph text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'text-black hover:bg-black/5 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Language Selector & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Badge 
                variant="outline" 
                className="hidden sm:flex items-center gap-2 border-black/20 text-black hover:bg-black/5 cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4" />
                EN
              </Badge>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden border-black/20 rounded-xl hover:scale-105 transition-all duration-300">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-cream">
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="flex items-center gap-3 pb-6 border-b border-black/10">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src="https://static.wixstatic.com/media/931b1e_d30c8d4239e144018ca611b3f2f911d8~mv2.jpg"
                          alt="Sukhi Sanchari Logo"
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl text-black">SUKHI SANCHARI</h2>
                        <p className="font-paragraph text-sm text-black/60">Heritage Travel Companion</p>
                      </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 font-paragraph ${
                              isActive(item.href)
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'text-black hover:bg-black/5'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </nav>

                    <div className="pt-6 border-t border-black/10">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-4 h-4 text-black/60" />
                        <span className="font-paragraph text-sm text-black/60">Language</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {['EN', 'ES', 'FR', 'DE'].map((lang) => (
                          <Badge 
                            key={lang}
                            variant={lang === 'EN' ? "default" : "outline"}
                            className={`justify-center cursor-pointer py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                              lang === 'EN' 
                                ? 'bg-primary text-primary-foreground shadow-md' 
                                : 'border-black/20 text-black hover:bg-black/5'
                            }`}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-black to-lavenderspot text-cream py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-[100rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://static.wixstatic.com/media/931b1e_d30c8d4239e144018ca611b3f2f911d8~mv2.jpg"
                    alt="Sukhi Sanchari Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-cream">SUKHI SANCHARI</h3>
                  <p className="font-paragraph text-sm text-cream/60">Heritage Travel Companion</p>
                </div>
              </div>
              <p className="font-paragraph text-cream/80 text-sm leading-relaxed">
                Your intelligent companion for exploring India's hidden heritage, ancient temples, and cultural treasures with happiness and wisdom.
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-heading text-lg text-cream mb-6">FEATURES</h4>
              <ul className="space-y-3">
                {[
                  'Hidden Temple Discovery',
                  'Heritage QR Scanner',
                  'Multilingual Guides',
                  'AI Trip Planner',
                  'Emergency SOS',
                  'Offline Heritage Maps'
                ].map((feature) => (
                  <li key={feature} className="font-paragraph text-cream/70 text-sm hover:text-cream transition-colors cursor-pointer hover:translate-x-1 duration-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading text-lg text-cream mb-6">SUPPORT</h4>
              <ul className="space-y-3">
                {[
                  'Help Center',
                  'Contact Us',
                  'Safety Guidelines',
                  'Report Issue',
                  'Feedback',
                  'Community'
                ].map((item) => (
                  <li key={item} className="font-paragraph text-cream/70 text-sm hover:text-cream transition-colors cursor-pointer hover:translate-x-1 duration-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency */}
            <div>
              <h4 className="font-heading text-lg text-cream mb-6">EMERGENCY</h4>
              <div className="space-y-4">
                <Button 
                  size="sm" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-heading rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/emergency">
                    <Shield className="w-4 h-4 mr-2" />
                    SOS HELP
                  </Link>
                </Button>
                <div className="space-y-2">
                  <p className="font-paragraph text-cream/70 text-xs">Emergency Numbers:</p>
                  <p className="font-paragraph text-cream text-sm">Police: 911</p>
                  <p className="font-paragraph text-cream text-sm">Medical: 911</p>
                  <p className="font-paragraph text-cream text-sm">Tourist Police: 555-HELP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-cream/20 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-paragraph text-cream/60 text-sm">
              © 2024 Sukhi Sanchari. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link to="/privacy" className="font-paragraph text-cream/70 text-sm hover:text-cream transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-cream/70 text-sm hover:text-cream transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="font-paragraph text-cream/70 text-sm hover:text-cream transition-colors hover:underline">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
