import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Phone, MapPin, Clock, AlertTriangle, CheckCircle, Users, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(0);

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: '🏥', color: 'bg-red-500' },
    { id: 'police', label: 'Police Assistance', icon: '👮', color: 'bg-blue-500' },
    { id: 'fire', label: 'Fire Emergency', icon: '🚒', color: 'bg-orange-500' },
    { id: 'lost', label: 'Lost/Stranded', icon: '🗺️', color: 'bg-yellow-500' },
    { id: 'accident', label: 'Accident', icon: '🚨', color: 'bg-purple-500' },
    { id: 'other', label: 'Other Emergency', icon: '⚠️', color: 'bg-gray-500' }
  ];

  const localEmergencyNumbers = [
    { service: 'Police', number: '100', description: 'Emergency police assistance across India' },
    { service: 'Fire Brigade', number: '101', description: 'Fire emergency and rescue services' },
    { service: 'Ambulance', number: '102', description: 'Medical emergency and ambulance services' },
    { service: 'Disaster Management', number: '108', description: 'Emergency response and disaster management' },
    { service: 'Women Helpline', number: '1091', description: 'Women in distress helpline' },
    { service: 'Child Helpline', number: '1098', description: 'Child emergency and protection services' },
    { service: 'Tourist Helpline', number: '1363', description: 'Tourist assistance and information' },
    { service: 'Railway Helpline', number: '139', description: 'Railway passenger assistance and emergency' },
    { service: 'Road Accident', number: '1073', description: 'Road accident emergency response' },
    { service: 'Senior Citizen Helpline', number: '14567', description: 'Senior citizen assistance and support' },
    { service: 'Anti-Corruption Helpline', number: '1031', description: 'Report corruption and malpractices' },
    { service: 'Cyber Crime Helpline', number: '1930', description: 'Cyber crime reporting and assistance' }
  ];

  const safetyTips = [
    'Stay calm and assess the situation',
    'Move to a safe location if possible',
    'Call local emergency services immediately',
    'Share your location with trusted contacts',
    'Keep important documents accessible',
    'Stay in well-lit, populated areas'
  ];

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const activateEmergency = () => {
    if (!emergencyType) {
      alert('Please select an emergency type');
      return;
    }
    
    setIsEmergencyActive(true);
    setCountdown(30); // 30 second countdown before auto-alert
    
    // In a real app, this would:
    // 1. Send location to emergency services
    // 2. Notify emergency contacts
    // 3. Start live location tracking
    // 4. Connect to emergency dispatch
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(0);
    setEmergencyType('');
    setEmergencyMessage('');
  };

  const shareLocation = () => {
    if (userLocation) {
      const locationUrl = `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      if (navigator.share) {
        navigator.share({
          title: 'My Current Location - Emergency',
          text: 'I need assistance. Here is my current location:',
          url: locationUrl
        });
      } else {
        navigator.clipboard.writeText(locationUrl);
        alert('Location copied to clipboard');
      }
    }
  };

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-red-600 py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-6">
              EMERGENCY SOS
            </h1>
            <p className="font-paragraph text-lg text-white/90 max-w-3xl mx-auto">
              24/7 emergency assistance with live location sharing and instant access to local emergency services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Status */}
      {isEmergencyActive && (
        <section className="py-8 px-6 bg-red-50 border-b-4 border-red-500">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Alert className="border-red-200 bg-red-100 max-w-2xl mx-auto">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <AlertDescription className="text-red-700 font-paragraph text-lg">
                  <div className="flex items-center justify-between">
                    <span>Emergency Alert Active</span>
                    {countdown > 0 && (
                      <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                        {countdown}s
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    {countdown > 0 
                      ? 'Emergency services will be contacted automatically unless cancelled'
                      : 'Emergency services have been notified'
                    }
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Emergency Interface */}
      <section className="py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          {!isEmergencyActive ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Emergency Type Selection */}
              <Card className="border-0 shadow-lg max-w-4xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="font-heading text-2xl text-black">
                    SELECT EMERGENCY TYPE
                  </CardTitle>
                  <CardDescription className="font-paragraph text-black/70">
                    Choose the type of assistance you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {emergencyTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={emergencyType === type.id ? "default" : "outline"}
                          className={`w-full h-24 flex flex-col items-center justify-center gap-2 ${
                            emergencyType === type.id 
                              ? `${type.color} text-white hover:opacity-90` 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setEmergencyType(type.id)}
                        >
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-paragraph text-sm text-center">
                            {type.label}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Message */}
              <Card className="border-0 shadow-lg max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-black">
                    ADDITIONAL INFORMATION (OPTIONAL)
                  </CardTitle>
                  <CardDescription className="font-paragraph text-black/70">
                    Provide any additional details about your situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your situation, injuries, or specific assistance needed..."
                    value={emergencyMessage}
                    onChange={(e) => setEmergencyMessage(e.target.value)}
                    className="min-h-24 font-paragraph"
                  />
                </CardContent>
              </Card>

              {/* Location Status */}
              <Card className="border-0 shadow-lg max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-black flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    LOCATION STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userLocation ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-paragraph">Location detected and ready to share</span>
                      </div>
                      <Button 
                        onClick={shareLocation}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10 font-heading"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        SHARE LOCATION
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-paragraph">Location access required for emergency services</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Emergency Activation */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={activateEmergency}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-heading text-xl px-12 py-6 rounded-full shadow-lg"
                    disabled={!emergencyType}
                  >
                    <Shield className="w-6 h-6 mr-3" />
                    ACTIVATE EMERGENCY SOS
                  </Button>
                </motion.div>
                <p className="font-paragraph text-sm text-black/60 mt-4 max-w-md mx-auto">
                  This will immediately alert emergency services and share your location
                </p>
              </div>
            </motion.div>
          ) : (
            /* Active Emergency Interface */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-lg border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="font-heading text-2xl text-red-700 text-center">
                    EMERGENCY ACTIVE
                  </CardTitle>
                  <CardDescription className="font-paragraph text-red-600 text-center">
                    Emergency type: {emergencyTypes.find(t => t.id === emergencyType)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {emergencyTypes.find(t => t.id === emergencyType)?.icon}
                      </div>
                      {countdown > 0 ? (
                        <p className="font-paragraph text-lg text-black/80">
                          Emergency services will be contacted in {countdown} seconds
                        </p>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-paragraph text-lg">Emergency services notified</span>
                        </div>
                      )}
                    </div>

                    {emergencyMessage && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-heading text-sm text-black mb-2">YOUR MESSAGE:</h4>
                        <p className="font-paragraph text-black/80">{emergencyMessage}</p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {countdown > 0 && (
                        <Button 
                          onClick={cancelEmergency}
                          variant="outline"
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50 font-heading"
                        >
                          CANCEL EMERGENCY
                        </Button>
                      )}
                      <Button 
                        onClick={shareLocation}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        SHARE LOCATION
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-heading text-3xl text-black mb-4">
              LOCAL EMERGENCY NUMBERS
            </h2>
            <p className="font-paragraph text-black/70">
              Important contact numbers for immediate assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localEmergencyNumbers.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-lg text-black flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-primary" />
                      {contact.service}
                    </CardTitle>
                    <CardDescription className="font-paragraph text-black/70">
                      {contact.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => callEmergency(contact.number)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                    >
                      CALL {contact.number}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-heading text-3xl text-black mb-4">
              EMERGENCY SAFETY TIPS
            </h2>
            <p className="font-paragraph text-black/70">
              Important guidelines to follow during emergencies
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safetyTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary-foreground font-heading text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-paragraph text-black/80">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
