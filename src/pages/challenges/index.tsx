
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MedicalNavbar } from '@/components/layouts/MedicalNavbar';
import { MedicalButton } from '@/components/ui/medical-button';
import { MedicalBadge } from '@/components/ui/medical-badge';
import { MedicalCard, MedicalCardHeader, MedicalCardTitle, MedicalCardContent, MedicalCardFooter } from '@/components/ui/medical-card';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Filter, Search, Calendar, Users, ChevronRight, TrendingUp, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockChallengeService } from '@/services/mockData/MockChallengeService';
import Footer from '@/components/home/Footer';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  organizer?: string;
  start_date: string;
  end_date: string;
  status: string;
  prize?: string;
  eligibility?: string;
}

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const data = await mockChallengeService.getAllChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    // Filter by status
    if (activeFilter !== 'all' && challenge.status !== activeFilter) {
      return false;
    }

    // Filter by search term
    if (searchTerm && !challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !challenge.category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'secondary';
      case 'closed': return 'outline';
      default: return 'primary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days remaining for a challenge
  const getDaysRemaining = (endDateString: string) => {
    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    },
    exit: { opacity: 0 }
  };

  // Item animation variants
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <MedicalNavbar />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen pt-20"
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-medical overflow-hidden py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-moh-green"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-moh-gold"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="mb-4 relative"
                variants={itemVariants}
              >
                <span className="text-gradient">Healthcare Challenges</span>
                <motion.span 
                  className="absolute -top-10 -right-10 text-6xl opacity-20 text-moh-green font-normal"
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.15 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  +
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-700 mb-8"
                variants={itemVariants}
              >
                Discover and participate in cutting-edge healthcare challenges from the Ministry of Health and partner organizations. Innovate together to solve Saudi Arabia's healthcare priorities.
              </motion.p>
              
              <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
                <MedicalButton
                  variant="primary"
                  size="lg"
                  icon={<TrendingUp className="h-5 w-5" />}
                  onClick={() => window.scrollTo({ top: document.getElementById('challenges')?.offsetTop ?? 0 - 100, behavior: 'smooth' })}
                >
                  Explore Challenges
                </MedicalButton>
                <MedicalButton
                  variant="outline"
                  size="lg"
                  icon={<Lightbulb className="h-5 w-5" />}
                >
                  Submit Your Idea
                </MedicalButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <ScrollFadeIn>
          <div className="bg-gradient-to-r from-moh-green to-moh-darkGreen py-6 text-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-3xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    {challenges.length}+
                  </motion.span>
                  <span className="text-sm opacity-90">Active Challenges</span>
                </div>
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-3xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    SAR 1.2M+
                  </motion.span>
                  <span className="text-sm opacity-90">Total Prizes</span>
                </div>
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-3xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    542+
                  </motion.span>
                  <span className="text-sm opacity-90">Participants</span>
                </div>
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-3xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    48+
                  </motion.span>
                  <span className="text-sm opacity-90">Successful Innovations</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Challenges Section */}
        <section id="challenges" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Browse Challenges</h2>
                <p className="text-gray-600">Find the perfect challenge for your expertise and passion</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search challenges..." 
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moh-green focus:border-moh-green"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Filter Dropdown */}
                <div className="flex-shrink-0">
                  <MedicalButton 
                    icon={<Filter className="h-5 w-5" />} 
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Filter
                  </MedicalButton>
                </div>
              </div>
            </div>
            
            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'active', 'upcoming', 'closed'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-moh-green text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-moh-green/10'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Challenges Grid */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 bg-moh-green/20 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-moh-green/20 rounded mb-3"></div>
                  <div className="h-3 w-48 bg-moh-green/10 rounded"></div>
                </div>
              </div>
            ) : filteredChallenges.length > 0 ? (
              <motion.div 
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                variants={pageVariants}
              >
                {filteredChallenges.map((challenge) => (
                  <motion.div 
                    key={challenge.id} 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MedicalCard 
                      highlight="green" 
                      className="h-full"
                      onClick={() => navigate(`/challenges/${challenge.id}`)}
                    >
                      <div 
                        className="h-48 bg-center bg-cover bg-no-repeat relative"
                        style={{ backgroundImage: `url(${challenge.image_url || '/challenge-default.jpg'})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <MedicalBadge variant={getStatusColor(challenge.status)}>
                            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                          </MedicalBadge>
                        </div>
                      </div>
                      <MedicalCardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <MedicalCardTitle className="flex-grow">{challenge.title}</MedicalCardTitle>
                        </div>
                        <p className="text-sm text-gray-500">{challenge.category}</p>
                      </MedicalCardHeader>
                      <MedicalCardContent>
                        <p className="text-gray-700 line-clamp-3">
                          {challenge.description}
                        </p>
                        
                        <div className="flex items-center mt-4 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1 text-moh-green" />
                          <span>Deadline: {formatDate(challenge.end_date)}</span>
                        </div>
                        
                        {challenge.status === 'active' && getDaysRemaining(challenge.end_date) <= 14 && (
                          <div className="mt-2">
                            <MedicalBadge variant="warning" animate={true}>
                              Only {getDaysRemaining(challenge.end_date)} days left
                            </MedicalBadge>
                          </div>
                        )}
                        
                        {challenge.prize && (
                          <div className="mt-3 flex items-center">
                            <div className="text-sm font-medium text-moh-darkGreen">Prize:</div>
                            <div className="ml-2 text-sm text-gray-700">{challenge.prize}</div>
                          </div>
                        )}
                      </MedicalCardContent>
                      <MedicalCardFooter>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Open to all</span>
                        </div>
                        <MedicalButton 
                          variant="outline" 
                          size="sm"
                          iconPosition="right"
                          icon={<ChevronRight className="h-4 w-4" />}
                        >
                          View Details
                        </MedicalButton>
                      </MedicalCardFooter>
                    </MedicalCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-moh-lightGreen rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-moh-green" />
                </div>
                <h3 className="text-xl mb-2">No challenges found</h3>
                <p className="text-gray-600 max-w-md mx-auto">We couldn't find any challenges matching your criteria. Try adjusting your filters or search terms.</p>
                <MedicalButton 
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                >
                  Clear Filters
                </MedicalButton>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <ScrollFadeIn>
          <section className="py-16 bg-moh-lightGreen relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Have an Innovation to Share?
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-700 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Submit your healthcare innovation for review or propose a challenge for the community. Join the rapidly growing healthcare innovation ecosystem in Saudi Arabia.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <MedicalButton 
                    variant="primary" 
                    size="lg"
                  >
                    Submit Innovation
                  </MedicalButton>
                  <MedicalButton 
                    variant="secondary" 
                    size="lg"
                  >
                    Propose a Challenge
                  </MedicalButton>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              whileInView={{ opacity: 0.1, scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute top-10 left-10 w-24 h-24 border-2 border-moh-green rounded"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute bottom-10 right-10 w-32 h-32 border-2 border-moh-gold rounded-full"
            />
          </section>
        </ScrollFadeIn>
      </motion.div>
      <Footer />
    </>
  );
};

export default ChallengesPage;
