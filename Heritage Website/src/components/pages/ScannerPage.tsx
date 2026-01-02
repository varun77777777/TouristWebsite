import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QrCode, Camera, Scan, Volume2, FileText, Video, AlertCircle, CheckCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'ur', name: 'اردو' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' }
  ];

  // Mock monument data that would be fetched based on QR code
  const monumentData = {
    id: 'monument_001',
    name: 'Historic City Hall',
    category: 'Historical Architecture',
    yearBuilt: 1892,
    architect: 'James Richardson',
    image: 'https://static.wixstatic.com/media/931b1e_85bc050ffc414daaaa213e32f389e8c0~mv2.png?originWidth=576&originHeight=384',
    description: {
      en: 'A magnificent example of Victorian architecture, this city hall has served as the heart of municipal government for over 130 years. The building features intricate stonework and beautiful stained glass windows.',
      es: 'Un magnífico ejemplo de arquitectura victoriana, este ayuntamiento ha servido como el corazón del gobierno municipal durante más de 130 años. El edificio presenta intrincados trabajos en piedra y hermosas vidrieras.',
      fr: 'Un magnifique exemple d\'architecture victorienne, cet hôtel de ville sert de cœur au gouvernement municipal depuis plus de 130 ans. Le bâtiment présente des travaux de pierre complexes et de beaux vitraux.',
      de: 'Ein prächtiges Beispiel viktorianischer Architektur, dieses Rathaus dient seit über 130 Jahren als Herz der Stadtverwaltung. Das Gebäude zeigt komplizierte Steinarbeiten und schöne Buntglasfenster.',
      it: 'Un magnifico esempio di architettura vittoriana, questo municipio ha servito come cuore del governo municipale per oltre 130 anni. L\'edificio presenta intricate opere in pietra e bellissime vetrate.',
      ja: 'ビクトリア朝建築の素晴らしい例であるこの市庁舎は、130年以上にわたって市政府の中心として機能してきました。建物には複雑な石工細工と美しいステンドグラスの窓があります。'
    },
    audioGuide: {
      en: 'audio-guide-en.mp3',
      es: 'audio-guide-es.mp3',
      fr: 'audio-guide-fr.mp3',
      de: 'audio-guide-de.mp3',
      it: 'audio-guide-it.mp3',
      ja: 'audio-guide-ja.mp3'
    },
    videoGuide: {
      en: 'video-guide-en.mp4',
      es: 'video-guide-es.mp4',
      fr: 'video-guide-fr.mp4'
    },
    facts: [
      'First electric lighting installed in 1895',
      'Survived the great earthquake of 1906',
      'Houses the original city charter from 1850',
      'Clock tower chimes every hour'
    ],
    nearbyAttractions: [
      'Central Park - 200m',
      'Art Museum - 500m',
      'Historic Theater - 300m'
    ]
  };

  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate successful QR code scan
    setScannedData(monumentData);
    stopScanning();
  };

  const playAudioGuide = () => {
    // In a real app, this would play the actual audio file
    alert(`Playing audio guide in ${languages.find(l => l.code === selectedLanguage)?.name}`);
  };

  const playVideoGuide = () => {
    // In a real app, this would open video player
    alert(`Opening video guide in ${languages.find(l => l.code === selectedLanguage)?.name}`);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <QrCode className="w-16 h-16 text-secondary-foreground mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-6xl text-secondary-foreground mb-6">
              QR MONUMENT SCANNER
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground/90 max-w-3xl mx-auto">
              Scan QR codes on monuments and landmarks to unlock detailed historical information and multimedia guides
            </p>
          </motion.div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-8 px-6 bg-cream">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="font-heading text-xl text-black mb-4">
              SELECT GUIDE LANGUAGE
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <Badge 
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedLanguage === lang.code 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-transparent text-black border-black/30 hover:bg-black/5'
                  }`}
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  {lang.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          {!scannedData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="font-heading text-2xl text-black">
                    CAMERA SCANNER
                  </CardTitle>
                  <CardDescription className="font-paragraph text-black/70">
                    Point your camera at a QR code on any monument or landmark
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-600 font-paragraph">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                    {isScanning ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          playsInline
                          muted
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-2 border-cream rounded-lg">
                            <div className="w-full h-full border-2 border-cream border-dashed rounded-lg animate-pulse"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-black/70 text-cream">
                            <Scan className="w-4 h-4 mr-2" />
                            Scanning for QR codes...
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-cream">
                          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="font-paragraph">Camera preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {!isScanning ? (
                      <Button 
                        onClick={startScanning}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        START SCANNING
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={stopScanning}
                          variant="outline"
                          className="flex-1 border-primary text-primary hover:bg-primary/10 font-heading"
                        >
                          STOP SCANNING
                        </Button>
                        <Button 
                          onClick={simulateQRScan}
                          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading"
                        >
                          SIMULATE SCAN
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Scanned Content */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Alert className="border-green-200 bg-green-50 max-w-2xl mx-auto">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600 font-paragraph">
                  QR code successfully scanned! Monument information loaded.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monument Image */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="relative h-96">
                    <Image
                      src={scannedData.image}
                      alt={scannedData.name}
                      className="w-full h-full object-cover"
                      width={600}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/70 text-cream">
                        {scannedData.category}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Monument Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-2xl text-black">
                        {scannedData.name}
                      </CardTitle>
                      <CardDescription className="font-paragraph text-black/70">
                        Built in {scannedData.yearBuilt} by {scannedData.architect}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-paragraph text-black/80 mb-6">
                        {scannedData.description[selectedLanguage]}
                      </p>

                      {/* Multimedia Guides */}
                      <div className="space-y-4">
                        <h4 className="font-heading text-lg text-black">
                          MULTIMEDIA GUIDES
                        </h4>
                        <div className="flex gap-3">
                          <Button 
                            onClick={playAudioGuide}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            AUDIO GUIDE
                          </Button>
                          {scannedData.videoGuide[selectedLanguage] && (
                            <Button 
                              onClick={playVideoGuide}
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/10 font-heading"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              VIDEO GUIDE
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interesting Facts */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl text-black flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        INTERESTING FACTS
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {scannedData.facts.map((fact: string, index: number) => (
                          <li key={index} className="font-paragraph text-black/80 flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Nearby Attractions */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl text-black">
                        NEARBY ATTRACTIONS
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {scannedData.nearbyAttractions.map((attraction: string, index: number) => (
                          <li key={index} className="font-paragraph text-black/80">
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => {
                    setScannedData(null);
                    setError('');
                  }}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading px-8"
                >
                  SCAN ANOTHER QR CODE
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
