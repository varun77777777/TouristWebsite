import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Clock, Users, Sparkles, Download, Share, Star, Navigation } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function PlannerPage() {
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    duration: '',
    budget: '',
    interests: [] as string[],
    groupSize: '',
    travelStyle: '',
    specialRequests: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Ancient Temples', 'Archaeological Sites', 'Heritage Architecture', 'Local Culture',
    'Traditional Crafts', 'Spiritual Experiences', 'Photography', 'Adventure',
    'Local Cuisine', 'Festivals', 'Nature & Wildlife', 'Art & Museums'
  ];

  const budgetRanges = [
    { value: 'budget', label: 'Budget (₹1,000-3,000/day)' },
    { value: 'moderate', label: 'Moderate (₹3,000-7,000/day)' },
    { value: 'luxury', label: 'Luxury (₹7,000+/day)' }
  ];

  const travelStyles = [
    { value: 'explorer', label: 'Cultural Explorer' },
    { value: 'spiritual', label: 'Spiritual Seeker' },
    { value: 'photographer', label: 'Heritage Photographer' },
    { value: 'family', label: 'Family Adventure' },
    { value: 'solo', label: 'Solo Wanderer' }
  ];

  // Mock AI-generated itinerary
  const mockItinerary = {
    title: "Hidden Gems of Karnataka",
    duration: "5 Days",
    totalBudget: "₹15,000",
    highlights: ["Hoysaleswara Temple", "Badami Caves", "Aihole Complex", "Local Artisan Villages"],
    days: [
      {
        day: 1,
        title: "Arrival & Halebidu Exploration",
        location: "Halebidu",
        activities: [
          {
            time: "09:00 AM",
            activity: "Hoysaleswara Temple Visit",
            duration: "2 hours",
            cost: "₹50",
            description: "Explore intricate Hoysala architecture and stone carvings"
          },
          {
            time: "12:00 PM",
            activity: "Traditional Lunch",
            duration: "1 hour",
            cost: "₹300",
            description: "Authentic Karnataka cuisine at local restaurant"
          },
          {
            time: "02:00 PM",
            activity: "Kedareshwara Temple",
            duration: "1.5 hours",
            cost: "₹30",
            description: "Lesser-known Hoysala temple with unique sculptures"
          },
          {
            time: "05:00 PM",
            activity: "Local Artisan Workshop",
            duration: "2 hours",
            cost: "₹500",
            description: "Learn traditional stone carving techniques"
          }
        ],
        accommodation: "Heritage Homestay",
        accommodationCost: "₹2,000"
      },
      {
        day: 2,
        title: "Badami Cave Temples",
        location: "Badami",
        activities: [
          {
            time: "08:00 AM",
            activity: "Cave Temple Complex",
            duration: "3 hours",
            cost: "₹100",
            description: "Explore 6th-century rock-cut temples"
          },
          {
            time: "12:00 PM",
            activity: "Agastya Lake Boat Ride",
            duration: "1 hour",
            cost: "₹200",
            description: "Scenic boat ride with temple views"
          },
          {
            time: "03:00 PM",
            activity: "Badami Fort Trek",
            duration: "2 hours",
            cost: "₹50",
            description: "Climb to ancient fort ruins for panoramic views"
          },
          {
            time: "06:00 PM",
            activity: "Sunset Photography",
            duration: "1 hour",
            cost: "Free",
            description: "Capture golden hour at sandstone cliffs"
          }
        ],
        accommodation: "Cave View Resort",
        accommodationCost: "₹2,500"
      },
      {
        day: 3,
        title: "Aihole - Cradle of Temple Architecture",
        location: "Aihole",
        activities: [
          {
            time: "09:00 AM",
            activity: "Durga Temple Complex",
            duration: "2 hours",
            cost: "₹75",
            description: "Unique apsidal temple architecture"
          },
          {
            time: "11:30 AM",
            activity: "Lad Khan Temple",
            duration: "1 hour",
            cost: "₹25",
            description: "Earliest structural temple in Aihole"
          },
          {
            time: "01:00 PM",
            activity: "Village Lunch Experience",
            duration: "1.5 hours",
            cost: "₹400",
            description: "Home-cooked meal with local family"
          },
          {
            time: "03:00 PM",
            activity: "Meguti Jain Temple",
            duration: "1 hour",
            cost: "₹30",
            description: "Hilltop temple with valley views"
          },
          {
            time: "05:00 PM",
            activity: "Archaeological Museum",
            duration: "1 hour",
            cost: "₹20",
            description: "Chalukyan artifacts and sculptures"
          }
        ],
        accommodation: "Heritage Village Stay",
        accommodationCost: "₹1,800"
      }
    ],
    tips: [
      "Best time to visit: October to March for pleasant weather",
      "Carry water and sun protection for temple visits",
      "Respect photography restrictions in sacred areas",
      "Learn basic Kannada phrases for better local interaction",
      "Book heritage accommodations in advance"
    ],
    transportation: {
      type: "Private Car with Driver",
      cost: "₹8,000 for 5 days",
      details: "Includes fuel, driver allowance, and parking"
    }
  };

  const handleInterestToggle = (interest: string) => {
    setTripDetails(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedPlan(mockItinerary);
      setIsGenerating(false);
    }, 3000);
  };

  const downloadPlan = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading your personalized itinerary...');
  };

  const sharePlan = () => {
    // In a real app, this would share the plan
    if (navigator.share) {
      navigator.share({
        title: 'My India Heritage Trip Plan',
        text: 'Check out my AI-generated trip to hidden Indian temples!',
        url: window.location.href
      });
    } else {
      alert('Plan copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-saffron py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Sparkles className="w-16 h-16 text-saffron-foreground mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-6xl text-saffron-foreground mb-6">
              AI HERITAGE PLANNER
            </h1>
            <p className="font-paragraph text-lg text-saffron-foreground/90 max-w-3xl mx-auto">
              Let our AI create a personalized journey through India's hidden temples, ancient sites, and cultural treasures
            </p>
          </motion.div>
        </div>
      </section>

      {!generatedPlan ? (
        /* Trip Planning Form */
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-black flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    TRIP PREFERENCES
                  </CardTitle>
                  <CardDescription className="font-paragraph text-black/70">
                    Tell us about your ideal heritage journey through India
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-heading text-sm text-black mb-2 block">
                        PREFERRED REGION
                      </label>
                      <Select value={tripDetails.destination} onValueChange={(value) => 
                        setTripDetails(prev => ({ ...prev, destination: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region to explore" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="karnataka">Karnataka (Hoysala Heritage)</SelectItem>
                          <SelectItem value="gujarat">Gujarat (Stepwells & Harappan Sites)</SelectItem>
                          <SelectItem value="madhya-pradesh">Madhya Pradesh (Rock Art & Forts)</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan (Hidden Palaces)</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu (Chola Temples)</SelectItem>
                          <SelectItem value="andhra-pradesh">Andhra Pradesh (Buddhist Sites)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-heading text-sm text-black mb-2 block">
                        TRIP DURATION
                      </label>
                      <Select value={tripDetails.duration} onValueChange={(value) => 
                        setTripDetails(prev => ({ ...prev, duration: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="How long is your trip?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-days">3 Days</SelectItem>
                          <SelectItem value="5-days">5 Days</SelectItem>
                          <SelectItem value="7-days">1 Week</SelectItem>
                          <SelectItem value="10-days">10 Days</SelectItem>
                          <SelectItem value="14-days">2 Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-heading text-sm text-black mb-2 block">
                        BUDGET RANGE
                      </label>
                      <Select value={tripDetails.budget} onValueChange={(value) => 
                        setTripDetails(prev => ({ ...prev, budget: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-heading text-sm text-black mb-2 block">
                        TRAVEL STYLE
                      </label>
                      <Select value={tripDetails.travelStyle} onValueChange={(value) => 
                        setTripDetails(prev => ({ ...prev, travelStyle: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your style" />
                        </SelectTrigger>
                        <SelectContent>
                          {travelStyles.map((style) => (
                            <SelectItem key={style.value} value={style.value}>
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="font-heading text-sm text-black mb-3 block">
                      INTERESTS & PREFERENCES
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant={tripDetails.interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${
                            tripDetails.interests.includes(interest)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-transparent text-black border-black/30 hover:bg-black/5'
                          }`}
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-heading text-sm text-black mb-2 block">
                      GROUP SIZE
                    </label>
                    <Input
                      placeholder="e.g., 2 adults, 1 child"
                      value={tripDetails.groupSize}
                      onChange={(e) => setTripDetails(prev => ({ ...prev, groupSize: e.target.value }))}
                      className="font-paragraph"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm text-black mb-2 block">
                      SPECIAL REQUESTS (OPTIONAL)
                    </label>
                    <Textarea
                      placeholder="Any specific temples, dietary requirements, accessibility needs, or special interests..."
                      value={tripDetails.specialRequests}
                      onChange={(e) => setTripDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="min-h-20 font-paragraph"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  onClick={generateItinerary}
                  disabled={!tripDetails.destination || !tripDetails.duration || isGenerating}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-12 py-6"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      CREATING YOUR JOURNEY...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      GENERATE AI ITINERARY
                    </>
                  )}
                </Button>
                <p className="font-paragraph text-sm text-black/60 mt-4">
                  Our AI will create a personalized itinerary in seconds
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        /* Generated Itinerary */
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Itinerary Header */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-saffron to-emerald text-white">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <h2 className="font-heading text-3xl mb-2">{generatedPlan.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {generatedPlan.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {generatedPlan.totalBudget}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {generatedPlan.highlights.length} Sites
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={downloadPlan}
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 font-heading"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        DOWNLOAD
                      </Button>
                      <Button 
                        onClick={sharePlan}
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 font-heading"
                      >
                        <Share className="w-4 h-4 mr-2" />
                        SHARE
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-black">
                    TRIP HIGHLIGHTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {generatedPlan.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="text-center p-4 bg-cream rounded-lg">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary-foreground font-heading text-lg">
                            {index + 1}
                          </span>
                        </div>
                        <p className="font-paragraph text-sm text-black">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Itinerary */}
              <div className="space-y-6">
                {generatedPlan.days.map((day: any, dayIndex: number) => (
                  <Card key={dayIndex} className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald/10 to-saffron/10">
                      <CardTitle className="font-heading text-xl text-black">
                        DAY {day.day}: {day.title}
                      </CardTitle>
                      <CardDescription className="font-paragraph text-black/70 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {day.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {day.activities.map((activity: any, actIndex: number) => (
                          <div key={actIndex} className="flex gap-4 p-4 bg-cream/50 rounded-lg">
                            <div className="flex-shrink-0 w-20 text-center">
                              <div className="font-heading text-sm text-primary">{activity.time}</div>
                              <div className="font-paragraph text-xs text-black/60">{activity.duration}</div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-heading text-base text-black">{activity.activity}</h4>
                              <p className="font-paragraph text-sm text-black/70 mt-1">{activity.description}</p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <div className="font-heading text-sm text-emerald">{activity.cost}</div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="mt-6 p-4 bg-royal/10 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-heading text-sm text-black">ACCOMMODATION</h4>
                              <p className="font-paragraph text-sm text-black/70">{day.accommodation}</p>
                            </div>
                            <div className="font-heading text-sm text-royal">{day.accommodationCost}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Transportation & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-black">
                      TRANSPORTATION
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-paragraph text-black/70">Type:</span>
                        <span className="font-heading text-sm text-black">{generatedPlan.transportation.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-paragraph text-black/70">Total Cost:</span>
                        <span className="font-heading text-sm text-emerald">{generatedPlan.transportation.cost}</span>
                      </div>
                      <p className="font-paragraph text-xs text-black/60 mt-2">
                        {generatedPlan.transportation.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-black">
                      TRAVEL TIPS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.tips.map((tip: string, index: number) => (
                        <li key={index} className="font-paragraph text-sm text-black/80 flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={downloadPlan}
                    size="lg"
                    className="bg-emerald text-emerald-foreground hover:bg-emerald/90 font-heading px-8"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    DOWNLOAD FULL ITINERARY
                  </Button>
                  <Button 
                    onClick={() => setGeneratedPlan(null)}
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 font-heading px-8"
                  >
                    CREATE NEW PLAN
                  </Button>
                </div>
                <p className="font-paragraph text-sm text-black/60">
                  Your itinerary includes QR codes for each location, offline maps, and emergency contacts
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
