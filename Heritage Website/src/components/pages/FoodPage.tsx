import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils, Search, Filter, Star, MapPin, Clock, DollarSign, Leaf, Flame } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPriceRange, setPriceRange] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');

  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'local', label: 'Local Traditional' },
    { value: 'italian', label: 'Italian' },
    { value: 'asian', label: 'Asian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'american', label: 'American' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: '$ Budget' },
    { value: 'moderate', label: '$$ Moderate' },
    { value: 'upscale', label: '$$$ Upscale' },
    { value: 'fine', label: '$$$$ Fine Dining' }
  ];

  const dietaryOptions = [
    { value: 'all', label: 'All Options' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Heritage Thali House",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_83283fd2e4454a7e91a819a8cfc2230d~mv2.png?originWidth=384&originHeight=256",
      rating: 4.9,
      reviews: 1847,
      priceRange: "moderate",
      distance: "0.2 km",
      openHours: "11:00 AM - 10:00 PM",
      description: "Authentic regional Indian thalis featuring traditional recipes from across India",
      specialties: ["Rajasthani Thali", "South Indian Meals", "Gujarati Thali", "Bengali Fish Curry"],
      dietary: ["vegetarian", "vegan", "halal"],
      isSpicy: true,
      isPopular: true
    },
    {
      id: 2,
      name: "Spice Route",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_df3581f75c2d4866be7196dae1fcc4fb~mv2.png?originWidth=384&originHeight=256",
      rating: 4.6,
      reviews: 892,
      priceRange: "moderate",
      distance: "0.7 km",
      openHours: "11:00 AM - 11:00 PM",
      description: "Aromatic Indian spices and traditional cooking methods from North India",
      specialties: ["Butter Chicken", "Hyderabadi Biryani", "Tandoori Naan", "Dal Makhani"],
      dietary: ["vegetarian", "vegan", "halal"],
      isSpicy: true,
      isPopular: false
    },
    {
      id: 3,
      name: "Temple Kitchen",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_f29d871fb6ef425087525a5b735e285b~mv2.png?originWidth=384&originHeight=256",
      rating: 4.8,
      reviews: 1234,
      priceRange: "budget",
      distance: "0.4 km",
      openHours: "6:00 AM - 9:00 PM",
      description: "Pure vegetarian temple-style cooking with sattvic ingredients and traditional methods",
      specialties: ["Sambar Rice", "Rasam", "Coconut Chutney", "Mysore Pak"],
      dietary: ["vegetarian", "vegan"],
      isSpicy: false,
      isPopular: true
    },
    {
      id: 4,
      name: "Chaat Corner",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_8c803dc241b346e8955f5905021e8541~mv2.png?originWidth=384&originHeight=256",
      rating: 4.7,
      reviews: 2103,
      priceRange: "budget",
      distance: "0.5 km",
      openHours: "10:00 AM - 2:00 AM",
      description: "Vibrant street food hub with authentic Indian chaats and snacks",
      specialties: ["Pani Puri", "Bhel Puri", "Aloo Tikki", "Dahi Vada", "Samosa"],
      dietary: ["vegetarian", "vegan"],
      isSpicy: true,
      isPopular: true
    },
    {
      id: 5,
      name: "Royal Mughlai",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_36a74ca014e34804bbbe5cb8cff07753~mv2.png?originWidth=384&originHeight=256",
      rating: 4.5,
      reviews: 445,
      priceRange: "upscale",
      distance: "0.9 km",
      openHours: "6:00 PM - 11:00 PM",
      description: "Elegant Mughlai cuisine with royal recipes and traditional cooking techniques",
      specialties: ["Lucknowi Biryani", "Kebab Platter", "Korma", "Kulfi"],
      dietary: ["halal"],
      isSpicy: true,
      isPopular: false
    },
    {
      id: 6,
      name: "Coastal Curry House",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_c9bb3b2d280e40ae9952017c8e682b0b~mv2.png?originWidth=384&originHeight=256",
      rating: 4.6,
      reviews: 789,
      priceRange: "moderate",
      distance: "1.2 km",
      openHours: "12:00 PM - 10:00 PM",
      description: "Fresh coastal Indian cuisine featuring seafood curries and coconut-based dishes",
      specialties: ["Fish Curry", "Prawn Masala", "Appam", "Coconut Rice"],
      dietary: ["halal"],
      isSpicy: true,
      isPopular: true
    },
    {
      id: 7,
      name: "Punjabi Dhaba",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_51ad9ca648e946a099ed851c3eb1b6ca~mv2.png?originWidth=384&originHeight=256",
      rating: 4.4,
      reviews: 567,
      priceRange: "budget",
      distance: "0.8 km",
      openHours: "8:00 AM - 11:00 PM",
      description: "Authentic Punjabi roadside dhaba experience with hearty North Indian meals",
      specialties: ["Makki Roti", "Sarson Saag", "Lassi", "Chole Bhature"],
      dietary: ["vegetarian", "halal"],
      isSpicy: true,
      isPopular: true
    },
    {
      id: 8,
      name: "Sweets & Mithai",
      cuisine: "indian",
      image: "https://static.wixstatic.com/media/931b1e_b4eca9e7891640d39452f89c3eb9a7fa~mv2.png?originWidth=384&originHeight=256",
      rating: 4.7,
      reviews: 923,
      priceRange: "budget",
      distance: "0.6 km",
      openHours: "7:00 AM - 10:00 PM",
      description: "Traditional Indian sweets and desserts made fresh daily with authentic recipes",
      specialties: ["Gulab Jamun", "Rasgulla", "Jalebi", "Barfi", "Halwa"],
      dietary: ["vegetarian"],
      isSpicy: false,
      isPopular: true
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPriceRange === 'all' || restaurant.priceRange === selectedPriceRange;
    const matchesDietary = selectedDietary === 'all' || restaurant.dietary.includes(selectedDietary);
    return matchesSearch && matchesCuisine && matchesPrice && matchesDietary;
  });

  const getPriceSymbol = (priceRange: string) => {
    switch (priceRange) {
      case 'budget': return '$';
      case 'moderate': return '$$';
      case 'upscale': return '$$$';
      case 'fine': return '$$$$';
      default: return '$';
    }
  };

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
            <Utensils className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-6">
              LOCAL CUISINE EXPLORER
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Discover authentic local flavors, traditional dishes, and hidden culinary gems
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
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
                <Input
                  placeholder="Search restaurants, dishes, or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 font-paragraph"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine.value} value={cuisine.value}>
                      {cuisine.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDietary} onValueChange={setSelectedDietary}>
                <SelectTrigger className="h-12">
                  <Leaf className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dietaryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Local Dishes */}
      <section className="py-12 px-6 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
              MUST-TRY INDIAN SPECIALTIES
            </h2>
            <p className="font-paragraph text-secondary-foreground/80">
              Signature dishes that define India's rich culinary heritage across regions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rajasthani Dal Baati Churma',
                image: 'https://static.wixstatic.com/media/931b1e_7a9cccf41c2847a3802705e67651705b~mv2.png?originWidth=384&originHeight=192'
              },
              {
                name: 'South Indian Dosa Platter',
                image: 'https://static.wixstatic.com/media/931b1e_770828cac6324d1184b6f8d8b7de8f81~mv2.png?originWidth=384&originHeight=192'
              },
              {
                name: 'Bengali Fish Curry',
                image: 'https://static.wixstatic.com/media/931b1e_3ca62611e2064de6a6f3ae2eaff918ee~mv2.png?originWidth=384&originHeight=192'
              }
            ].map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/70 text-cream">
                        Regional Specialty
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl text-black mb-2">{dish.name}</h3>
                    <p className="font-paragraph text-black/70 text-sm">
                      A traditional Indian recipe passed down through generations
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl text-black mb-2">
              {filteredRestaurants.length} RESTAURANTS FOUND
            </h2>
            <p className="font-paragraph text-black/70">
              Sorted by distance and popularity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-black/70 text-cream border-0">
                        {cuisines.find(c => c.value === restaurant.cuisine)?.label}
                      </Badge>
                      {restaurant.isPopular && (
                        <Badge className="bg-primary text-primary-foreground border-0">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {restaurant.isSpicy && (
                        <Badge className="bg-orange-500 text-white border-0">
                          <Flame className="w-3 h-3" />
                        </Badge>
                      )}
                      <div className="bg-black/70 text-cream px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-paragraph text-sm">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 text-white border-0">
                        {getPriceSymbol(restaurant.priceRange)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-xl text-black">
                      {restaurant.name}
                    </CardTitle>
                    <CardDescription className="font-paragraph text-black/70">
                      {restaurant.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-4">
                    <div className="flex items-center justify-between text-sm text-black/60">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="font-paragraph">{restaurant.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-paragraph">Open</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading text-sm text-black mb-2">SPECIALTIES:</h4>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.specialties.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-primary/30 text-primary">
                            {specialty}
                          </Badge>
                        ))}
                        {restaurant.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            +{restaurant.specialties.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading text-sm text-black mb-2">DIETARY OPTIONS:</h4>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.dietary.map((option, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-green-300 text-green-600">
                            <Leaf className="w-3 h-3 mr-1" />
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                      >
                        VIEW MENU
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        DIRECTIONS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="font-heading text-2xl text-black mb-4">
                NO RESTAURANTS FOUND
              </h3>
              <p className="font-paragraph text-black/70 mb-8">
                Try adjusting your search criteria or explore different options
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('all');
                  setPriceRange('all');
                  setSelectedDietary('all');
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
              >
                CLEAR FILTERS
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Food Culture Section */}
      <section className="py-12 px-6 bg-lavenderspot">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl text-primary-foreground mb-6">
              DISCOVER LOCAL FOOD CULTURE
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Learn about traditional cooking methods, local ingredients, and the stories behind each dish
            </p>
            <Button 
              size="lg" 
              className="bg-cream text-black hover:bg-cream/90 font-heading px-8"
            >
              EXPLORE FOOD TOURS
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
