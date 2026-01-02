import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Filter, Star, Clock, Users, Camera } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'historical', label: 'Historical Sites' },
    { value: 'museums', label: 'Museums' },
    { value: 'nature', label: 'Nature & Parks' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' }
  ];

  const attractions = [
    {
      id: 1,
      name: "Rani ki Vav",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_b7fac6f60c7946ee87bee2dbc7c30471~mv2.png?originWidth=384&originHeight=320",
      rating: 4.9,
      reviews: 847,
      distance: "0.3 km",
      duration: "2-3 hours",
      description: "UNESCO World Heritage stepwell in Gujarat with intricate sculptures and ancient water management system",
      hasQR: true,
      hasAudio: true
    },
    {
      id: 2,
      name: "Hoysaleswara Temple",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_26334f5629244d778bc940bd777e594b~mv2.png?originWidth=384&originHeight=320",
      rating: 4.8,
      reviews: 623,
      distance: "0.7 km",
      duration: "1-2 hours",
      description: "12th-century Hoysala architecture temple in Halebidu with exquisite stone carvings",
      hasQR: true,
      hasAudio: true
    },
    {
      id: 3,
      name: "Lepakshi Temple",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_fa11d31ec47c49bb8706ba9184d735d1~mv2.png?originWidth=384&originHeight=320",
      rating: 4.7,
      reviews: 456,
      distance: "1.2 km",
      duration: "1-2 hours",
      description: "16th-century Vijayanagara temple famous for its hanging pillar and Veerabhadra sculptures",
      hasQR: false,
      hasAudio: false
    },
    {
      id: 4,
      name: "Bhimbetka Rock Shelters",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_68de0102fb084fe8b1d23ec8ae7e0dfc~mv2.png?originWidth=384&originHeight=320",
      rating: 4.6,
      reviews: 389,
      distance: "0.5 km",
      duration: "2-3 hours",
      description: "Prehistoric rock art site with paintings dating back 30,000 years in Madhya Pradesh",
      hasQR: true,
      hasAudio: false
    },
    {
      id: 5,
      name: "Aihole Temple Complex",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_9e71c13488214d259bc98603a5052f18~mv2.png?originWidth=384&originHeight=320",
      rating: 4.5,
      reviews: 234,
      distance: "0.9 km",
      duration: "2-3 hours",
      description: "Cradle of Indian temple architecture with 125 temples from Chalukya period",
      hasQR: true,
      hasAudio: true
    },
    {
      id: 6,
      name: "Mandu Fort Complex",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_6d5255818ca542bea71482d79bd4edf9~mv2.png?originWidth=384&originHeight=320",
      rating: 4.4,
      reviews: 567,
      distance: "1.5 km",
      duration: "3-4 hours",
      description: "Ruined city of Mandu with Afghan architecture, palaces, and romantic legends",
      hasQR: false,
      hasAudio: false
    },
    {
      id: 7,
      name: "Dholavira",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_b21b700f786d4838a5e5e00d7c2b4957~mv2.png?originWidth=384&originHeight=320",
      rating: 4.7,
      reviews: 298,
      distance: "2.1 km",
      duration: "2-3 hours",
      description: "Harappan civilization archaeological site in Gujarat with advanced water conservation",
      hasQR: true,
      hasAudio: true
    },
    {
      id: 8,
      name: "Badami Cave Temples",
      category: "historical",
      image: "https://static.wixstatic.com/media/931b1e_a9f951b1656f447e93fb8f6bbd5cadcc~mv2.png?originWidth=384&originHeight=320",
      rating: 4.6,
      reviews: 445,
      distance: "1.8 km",
      duration: "2-3 hours",
      description: "6th-century rock-cut cave temples with Hindu, Jain, and Buddhist sculptures",
      hasQR: true,
      hasAudio: false
    }
  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-6">
              EXPLORE HIDDEN INDIA
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Discover India's forgotten temples, ancient stepwells, and archaeological wonders off the beaten path
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
              <Input
                placeholder="Search attractions, museums, restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-paragraph"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-64 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading px-8"
              asChild
            >
              <Link to="/map">
                <MapPin className="w-4 h-4 mr-2" />
                VIEW MAP
              </Link>
            </Button>
          </motion.div>

          {userLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex items-center justify-center gap-2 text-black/70"
            >
              <MapPin className="w-4 h-4" />
              <span className="font-paragraph text-sm">
                Showing results near your location
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl text-black mb-2">
              {filteredAttractions.length} HIDDEN TREASURES FOUND
            </h2>
            <p className="font-paragraph text-black/70">
              Ancient temples and archaeological sites waiting to be explored
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/70 text-cream border-0">
                        {categories.find(c => c.value === attraction.category)?.label}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {attraction.hasQR && (
                        <Badge className="bg-primary text-primary-foreground border-0">
                          QR
                        </Badge>
                      )}
                      {attraction.hasAudio && (
                        <Badge className="bg-secondary text-secondary-foreground border-0">
                          Audio
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-cream px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-paragraph text-sm">{attraction.rating}</span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-xl text-black">
                      {attraction.name}
                    </CardTitle>
                    <CardDescription className="font-paragraph text-black/70">
                      {attraction.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-black/60 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="font-paragraph">{attraction.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-paragraph">{attraction.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-paragraph">{attraction.reviews}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                        asChild
                      >
                        <Link to={`/attraction/${attraction.id}`}>
                          VIEW DETAILS
                        </Link>
                      </Button>
                      {attraction.hasQR && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                          asChild
                        >
                          <Link to="/scanner">
                            <Camera className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAttractions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="font-heading text-2xl text-black mb-4">
                NO HIDDEN TREASURES FOUND
              </h3>
              <p className="font-paragraph text-black/70 mb-8">
                Try adjusting your search criteria to discover more ancient Indian sites
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
              >
                CLEAR FILTERS
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
