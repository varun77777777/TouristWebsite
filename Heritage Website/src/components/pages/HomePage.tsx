// HPI 1.5-V - Enhanced UI Version
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, QrCode, Headphones, Utensils, Shield, Globe, Star, Navigation, ArrowRight, Compass, Play, ChevronRight, Users, Award, Heart, Sparkles } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isIntersecting] as const;
};

const AnimatedSection = ({ children, className = '', threshold = 0.1, delay = 0 }: { children: React.ReactNode; className?: string; threshold?: number; delay?: number }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};


export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const stats = [
    { number: "10,000+", label: "Heritage Sites", icon: MapPin },
    { number: "50,000+", label: "Happy Travelers", icon: Users },
    { number: "18", label: "Languages", icon: Globe },
    { number: "4.9", label: "User Rating", icon: Award }
  ];

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-primary-foreground" />,
      title: "Hidden Temple Discovery",
      description: "AI-powered recommendations for India's forgotten temples, stepwells, and archaeological wonders off the beaten path.",
    },
    {
      icon: <QrCode className="w-8 h-8 text-primary-foreground" />,
      title: "Heritage QR Scanner",
      description: "Unlock the stories behind ancient monuments. Scan QR codes for detailed historical context and rich multimedia guides.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary-foreground" />,
      title: "Multilingual Heritage Guides",
      description: "Immerse yourself in India's history with audio, video, and text guides in multiple Indian and international languages.",
    },
    {
      icon: <Utensils className="w-8 h-8 text-primary-foreground" />,
      title: "Authentic Cuisine Explorer",
      description: "Taste the culture through traditional recipes, local specialties, and heritage cooking experiences across India.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-foreground" />,
      title: "Travel Safety & SOS",
      description: "Travel with confidence through India's remote heritage sites with 24/7 emergency assistance and live location sharing.",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-foreground" />,
      title: "Pan-India Heritage Coverage",
      description: "From Himalayan monasteries to South Indian temples, access comprehensive heritage data across all Indian states.",
    }
  ];

  const destinations = [
    {
      name: "Rani ki Vav Stepwell",
      image: "https://static.wixstatic.com/media/931b1e_3305e97214cd4e069c981e30811eda31~mv2.png?originWidth=384&originHeight=448",
      rating: 4.9,
      attractions: 8
    },
    {
      name: "Hoysaleswara Temple",
      image: "https://static.wixstatic.com/media/931b1e_3cbe11a3a50c460babd46249157cb2b8~mv2.png?originWidth=384&originHeight=448",
      rating: 4.8,
      attractions: 12
    },
    {
      name: "Bhimbetka Caves",
      image: "https://static.wixstatic.com/media/931b1e_0154b306f25c4dc8a046ffd8ea42477b~mv2.png?originWidth=384&originHeight=448",
      rating: 4.7,
      attractions: 6
    },
    {
      name: "Lepakshi Temple",
      image: "https://static.wixstatic.com/media/931b1e_ff4ab564a2324cc4ad12268aea7639da~mv2.png?originWidth=384&originHeight=448",
      rating: 4.8,
      attractions: 4
    }
  ];

  return (
    <div className="bg-background text-black overflow-clip">
      <style>{`
        .blurred-blob-1 {
          filter: blur(120px);
        }
        .blurred-blob-2 {
          filter: blur(100px);
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 99, 71, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 99, 71, 0.6); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-primary-foreground overflow-clip">
        <Image 
          src="https://static.wixstatic.com/media/931b1e_72889b07fcc040dab38bda35fe04c324~mv2.png?originWidth=1920&originHeight=1024"
          alt="A breathtaking panoramic view of ancient Indian temple complex with intricate stone carvings and golden sunset lighting, showcasing India's magnificent heritage architecture."
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-3/5 h-3/5 bg-lavenderspot/40 rounded-full blurred-blob-1 z-[1]"></div>
        <div className="absolute bottom-0 right-0 w-3/5 h-3/5 bg-primary/50 rounded-full blurred-blob-2 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-[2]"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full h-full pt-20 sm:pt-24 pb-16 sm:pb-20">
          {/* Floating badges with enhanced animations */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mb-8 sm:mb-12"
          >
            <div className="flex justify-between items-start">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="text-left backdrop-blur-md bg-black/30 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl"
              >
                <div className="font-heading text-lg sm:text-xl md:text-3xl text-cream flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary animate-pulse" />
                  ANCIENT
                </div>
                <div className="font-paragraph text-sm sm:text-base md:text-lg text-cream/90">
                  HERITAGE
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="text-right backdrop-blur-md bg-black/30 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl"
              >
                <div className="font-heading text-lg sm:text-xl md:text-3xl text-cream flex items-center gap-2 justify-end">
                  AI
                  <Sparkles className="w-6 h-6 text-saffron animate-pulse" />
                </div>
                <div className="font-paragraph text-sm sm:text-base md:text-lg text-cream/90">
                  POWERED
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary via-secondary to-saffron rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 animate-pulse overflow-hidden">
                  <Image 
                    src="https://static.wixstatic.com/media/931b1e_cbfdc0415b1d4b8abcb85ad7f0f63996~mv2.jpg"
                    alt="Travel explorer with headphones discovering world landmarks"
                    className="w-full h-full object-cover"
                    width={128}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald rounded-full flex items-center justify-center animate-bounce">
                  <Play className="w-4 h-4 text-emerald-foreground" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-none z-20 mb-6 sm:mb-8 drop-shadow-2xl bg-gradient-to-r from-cream via-white to-cream bg-clip-text text-transparent"
            >
              SUKHI SANCHARI
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-paragraph text-lg sm:text-xl md:text-2xl text-cream/95 mt-4 mb-10 sm:mb-16 max-w-lg sm:max-w-3xl px-2 sm:px-0 leading-relaxed drop-shadow-lg"
            >
              DISCOVER INDIA'S HIDDEN HERITAGE WITH INTELLIGENT TRAVEL GUIDANCE
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-secondary to-saffron text-primary-foreground hover:from-primary/90 hover:via-secondary/90 hover:to-saffron/90 font-heading text-base sm:text-lg px-10 sm:px-16 py-6 sm:py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group"
                asChild
              >
                <Link to="/explore">
                  <Compass className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                  START EXPLORING
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-cream/90 text-cream hover:bg-cream/20 backdrop-blur-md font-heading text-base sm:text-lg px-10 sm:px-16 py-6 sm:py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 group"
                asChild
              >
                <Link to="/scanner">
                  <QrCode className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  SCAN MONUMENT
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - New Addition */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-saffron/10 border-y border-primary/20">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-black mb-2 group-hover:text-primary transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="font-paragraph text-sm sm:text-base text-black/70">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Section */}
      <AnimatedSection delay={0.2} className="w-full max-w-[120rem] mx-auto py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-br from-cream via-background to-cream/80">
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full mb-6 text-sm font-heading">
                HOW IT WORKS
              </Badge>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-black mb-8 bg-gradient-to-r from-black via-primary to-black bg-clip-text text-transparent">
                Your Journey, Simplified
              </h2>
              <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-4xl mx-auto mt-6 px-4 sm:px-0 leading-relaxed">
                Three simple steps to unlock a world of discovery. Travel smarter, not harder with our AI-powered heritage companion.
              </p>
            </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-12">
            {[
              {
                number: "01",
                title: "Discover",
                description: "Find personalized recommendations for attractions, dining, and events near you with our intelligent AI system.",
                color: "from-primary to-primary/80",
                accent: "bg-secondary",
                icon: Compass
              },
              {
                number: "02", 
                title: "Scan & Learn",
                description: "Use our QR scanner at landmarks to instantly access rich historical guides and immersive stories.",
                color: "from-secondary to-secondary/80",
                accent: "bg-primary",
                icon: QrCode
              },
              {
                number: "03",
                title: "Experience", 
                description: "Immerse yourself with multilingual audio and video content for a deeper cultural connection.",
                color: "from-lavenderspot to-lavenderspot/80",
                accent: "bg-emerald",
                icon: Headphones
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="text-center px-6 sm:px-8 py-8 sm:py-12 group relative"
                >
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <span className="font-heading text-4xl sm:text-5xl text-primary-foreground">{step.number}</span>
                    </div>
                    <div className={`absolute -top-3 -right-3 w-8 h-8 ${step.accent} rounded-full animate-pulse shadow-lg`}></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-saffron/60 rounded-full animate-bounce"></div>
                  </div>
                  <div className="mb-6">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-black mb-6 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  <p className="font-paragraph text-base sm:text-lg text-black/70 max-w-sm mx-auto leading-relaxed">{step.description}</p>
                  
                  {/* Connecting line for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  )}
                </motion.div>
              );
            })}
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <section className="w-full bg-gradient-to-br from-background via-cream/30 to-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] relative z-10">
            <div className="lg:sticky lg:top-0 lg:h-screen p-6 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-center">
                <AnimatedSection delay={0.2}>
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-6 py-2 rounded-full mb-8 text-sm font-heading w-fit">
                      INTELLIGENT FEATURES
                    </Badge>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight">
                      Intelligent Heritage, <br className="hidden sm:block"/>
                      <span className="bg-gradient-to-r from-primary via-secondary to-saffron bg-clip-text text-transparent">
                        At Your Fingertips.
                      </span>
                    </h2>
                    <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-lg mt-6 sm:mt-8 mb-8 sm:mb-12 leading-relaxed">
                      Experience India's ancient heritage like never before with our AI-powered technology and comprehensive archaeological insights. Every feature is designed to make your spiritual and cultural exploration seamless and profound.
                    </p>
                    <div className="relative w-full aspect-square max-w-md sm:max-w-lg mx-auto lg:mx-0">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1 }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          className="relative"
                        >
                          <Image
                              src="https://static.wixstatic.com/media/931b1e_e4207352728b48839dc379be3006ac0b~mv2.png?originWidth=768&originHeight=768"
                              alt="Abstract 3D rendering of overlapping translucent shapes in brand colors."
                              width={800}
                              height={800}
                              className="w-full h-full object-contain drop-shadow-2xl"
                          />
                          <div className="absolute -top-8 sm:-top-12 -left-8 sm:-left-12 w-2/5 h-2/5 bg-primary/30 rounded-full blurred-blob-2 z-[-1] animate-pulse"></div>
                          <div className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-12 w-2/5 h-2/5 bg-lavenderspot/20 rounded-full blurred-blob-1 z-[-1] animate-pulse"></div>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>
            <div className="p-6 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-center gap-10 sm:gap-16">
                {features.slice(0, 3).map((feature, index) => (
                    <AnimatedSection key={index} delay={index * 0.2}>
                        <motion.div 
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-start gap-6 sm:gap-8 group p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary via-secondary to-saffron rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground">
                                  {feature.icon}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-black mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                                <p className="font-paragraph text-base sm:text-lg text-black/70 leading-relaxed">{feature.description}</p>
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "100%" }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        </motion.div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* Visual Breather Section */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-clip">
        <Image
            src="https://static.wixstatic.com/media/931b1e_ee360a5386d349efaa19d542e2ebb1df~mv2.png?originWidth=1920&originHeight=1024"
            alt="A serene, wide-angle shot of a misty forest at dawn."
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/40 to-secondary/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        
        <AnimatedSection delay={0.3} className="relative z-10 text-center px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto"
            >
              <Badge className="bg-cream/20 text-cream border-cream/30 px-8 py-3 rounded-full mb-8 text-base font-heading backdrop-blur-md">
                ANCIENT WISDOM AWAITS
              </Badge>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl text-cream max-w-4xl mx-auto leading-tight mb-8">
                Discover India's 
                <span className="block bg-gradient-to-r from-cream via-white to-cream bg-clip-text text-transparent">
                  Ancient Wisdom
                </span>
              </h2>
              <p className="font-paragraph text-lg sm:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
                Journey through millennia of heritage, where every stone tells a story and every temple holds the secrets of ancient civilizations.
              </p>
            </motion.div>
        </AnimatedSection>
      </section>

      {/* Popular Destinations Section */}
      <section className="w-full bg-gradient-to-br from-cream via-background to-cream py-20 sm:py-24 md:py-32 overflow-clip relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <AnimatedSection delay={0.2} className="flex flex-col md:flex-row justify-between md:items-end mb-12 sm:mb-16 md:mb-20">
                <div className="mb-8 md:mb-0">
                    <Badge className="bg-saffron/10 text-saffron border-saffron/20 px-6 py-2 rounded-full mb-6 text-sm font-heading">
                      FEATURED DESTINATIONS
                    </Badge>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-black mb-6 leading-tight">
                      Hidden Heritage 
                      <span className="block bg-gradient-to-r from-primary via-secondary to-saffron bg-clip-text text-transparent">
                        Treasures
                      </span>
                    </h2>
                    <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-2xl leading-relaxed">
                      Discover India's forgotten temples, ancient stepwells, and archaeological wonders waiting to be explored by the curious traveler.
                    </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                      variant="outline"
                      className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-cream font-heading text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 group"
                      asChild
                  >
                      <Link to="/explore">
                        VIEW ALL DESTINATIONS
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                  </Button>
                </motion.div>
            </AnimatedSection>
        </div>
        
        <div className="w-full pl-4 sm:pl-6 md:pl-12 lg:pl-24">
            <div className="flex gap-6 sm:gap-8 md:gap-10 overflow-x-auto scroll-container pb-8 sm:pb-12">
                {destinations.map((destination, index) => (
                    <AnimatedSection key={index} delay={index * 0.1} className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-[45vw] lg:w-[32vw] xl:w-[28vw]">
                        <motion.div
                          whileHover={{ y: -10, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl rounded-3xl sm:rounded-4xl overflow-clip h-full flex flex-col transition-all duration-500 group">
                              <div className="relative w-full aspect-[4/5] overflow-hidden">
                                  <Image
                                      src={destination.image}
                                      alt={destination.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                      width={400}
                                      height={500}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-cream">
                                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl mb-2">{destination.name}</h3>
                                      <div className="flex items-center gap-2 text-cream/90">
                                        <Navigation className="w-4 h-4" />
                                        <span className="font-paragraph text-sm">{destination.attractions} attractions nearby</span>
                                      </div>
                                  </div>
                                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-cream/95 text-black px-4 sm:px-5 py-2 sm:py-3 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-lg">
                                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-saffron" />
                                      <span className="font-heading text-sm sm:text-base font-bold">{destination.rating}</span>
                                  </div>
                                  
                                  {/* Hover overlay */}
                                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      whileHover={{ scale: 1 }}
                                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                                    >
                                      <Play className="w-8 h-8 text-primary ml-1" />
                                    </motion.div>
                                  </div>
                              </div>
                              <CardContent className="p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-b-3xl sm:rounded-b-4xl flex-grow">
                                  <div className="flex items-center justify-between">
                                    <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full text-xs font-heading">
                                      HERITAGE SITE
                                    </Badge>
                                    <Button 
                                      size="sm"
                                      className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 rounded-full px-6 font-heading"
                                      asChild
                                    >
                                      <Link to="/explore">
                                        EXPLORE
                                      </Link>
                                    </Button>
                                  </div>
                              </CardContent>
                          </Card>
                        </motion.div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gradient-to-br from-secondary via-lavenderspot to-secondary py-20 sm:py-28 md:py-40 px-6 sm:px-8 overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="https://static.wixstatic.com/media/931b1e_e7c7ba4525c24266805ed09d349121e5~mv2.png?originWidth=1920&originHeight=768"
                alt="A group of friends happily exploring a vibrant city street."
                width={1920}
                height={800}
                className="w-full h-full object-cover opacity-20"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/60 to-secondary/80"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-cream/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-saffron/20 rounded-full blur-lg animate-pulse"></div>
        
        <AnimatedSection delay={0.2} className="relative max-w-[120rem] mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto"
            >
              <Badge className="bg-cream/20 text-cream border-cream/30 px-8 py-3 rounded-full mb-8 text-base font-heading backdrop-blur-md">
                START YOUR JOURNEY
              </Badge>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl text-cream mb-6 sm:mb-8 leading-tight">
                Ready to Explore 
                <span className="block bg-gradient-to-r from-cream via-white to-cream bg-clip-text text-transparent">
                  India's Heritage?
                </span>
              </h2>
              <p className="font-paragraph text-lg sm:text-xl text-cream/90 max-w-4xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0 leading-relaxed">
                Join thousands of heritage enthusiasts who trust Sukhi Sanchari for their spiritual and cultural journeys through India's hidden treasures. Your adventure into ancient wisdom starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    size="lg" 
                    className="w-full bg-cream text-black hover:bg-cream/90 font-heading text-lg sm:text-xl px-10 sm:px-12 py-6 sm:py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/planner">
                      <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                      PLAN MY JOURNEY
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-2 border-cream text-cream hover:bg-cream/20 backdrop-blur-md font-heading text-lg sm:text-xl px-10 sm:px-12 py-6 sm:py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/scanner">
                      <QrCode className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      SCAN A MONUMENT
                    </Link>
                  </Button>
                </motion.div>
              </div>
              
              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-cream/80"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-paragraph text-sm">50,000+ Travelers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-paragraph text-sm">4.9 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-paragraph text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-paragraph text-sm">18 Languages</span>
                </div>
              </motion.div>
            </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
