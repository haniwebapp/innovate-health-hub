import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
export default function Footer() {
  const {
    language
  } = useLanguage();
  const socialIcons = [{
    name: "facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
  }, {
    name: "twitter",
    path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
  }, {
    name: "instagram",
    path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
  }, {
    name: "github",
    path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
  }];
  const quickLinks = ['About the Platform', 'Innovation Challenges', 'Investment Opportunities', 'Regulatory Sandbox', 'Knowledge Hub'];
  const resources = ['Vision 2030', 'MOH Strategy', 'Policies & Guidelines', 'Success Stories', 'Contact Support'];
  return <footer className="bg-moh-darkGreen text-white relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat z-0" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 0.1
    }} viewport={{
      once: true
    }} transition={{
      duration: 1
    }} />
      
      {/* Floating particles */}
      {Array.from({
      length: 10
    }).map((_, i) => <motion.div key={i} className="absolute rounded-full bg-white/10" style={{
      width: 4 + i % 4 * 3,
      height: 4 + i % 4 * 3,
      left: `${10 + i * 8}%`,
      top: `${i % 2 ? 20 : 80}%`
    }} animate={{
      y: [0, i % 2 ? -80 : 80],
      opacity: [0, 0.8, 0]
    }} transition={{
      duration: 10 + i * 2,
      repeat: Infinity,
      ease: "linear"
    }} />)}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="flex items-center mb-4">
              <img alt="Ministry of Health Logo" className="h-10 w-auto mr-3 brightness-150 contrast-75" src="/lovable-uploads/aa5a8c2a-2831-4e92-bfd9-cf9ef64c166a.png" />
            </div>
            <p className="text-gray-300 mb-4">
              The official innovation platform of the Saudi Ministry of Health, connecting healthcare innovators with resources and opportunities.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => <motion.a key={icon.name} href="#" className="text-gray-300 hover:text-white" whileHover={{
              scale: 1.2
            }} whileTap={{
              scale: 0.9
            }}>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <motion.path fillRule="evenodd" d={icon.path} clipRule="evenodd" initial={{
                  pathLength: 0
                }} animate={{
                  pathLength: 1
                }} transition={{
                  duration: 1.5,
                  delay: 0.2 + index * 0.1
                }} />
                  </svg>
                </motion.a>)}
            </div>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={0.3}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <motion.ul className="space-y-2" variants={{
            hidden: {
              opacity: 0
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }} initial="hidden" whileInView="visible" viewport={{
            once: true
          }}>
              {quickLinks.map((linkText, i) => <motion.li key={i} variants={{
              hidden: {
                opacity: 0,
                x: -10
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5
                }
              }
            }}>
                  <motion.a href="#" className="text-gray-300 hover:text-white inline-block relative" whileHover={{
                color: "#ffffff",
                transition: {
                  duration: 0.2
                }
              }}>
                    {linkText}
                    <motion.span className="absolute left-0 right-0 bottom-0 h-px bg-white" initial={{
                  scaleX: 0,
                  originX: 0
                }} whileHover={{
                  scaleX: 1
                }} transition={{
                  duration: 0.3
                }} />
                  </motion.a>
                </motion.li>)}
            </motion.ul>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={0.5}>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <motion.ul className="space-y-2" variants={{
            hidden: {
              opacity: 0
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }} initial="hidden" whileInView="visible" viewport={{
            once: true
          }}>
              {resources.map((resourceText, i) => <motion.li key={i} variants={{
              hidden: {
                opacity: 0,
                x: -10
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5
                }
              }
            }}>
                  <motion.a href="#" className="text-gray-300 hover:text-white inline-block relative" whileHover={{
                color: "#ffffff",
                transition: {
                  duration: 0.2
                }
              }}>
                    {resourceText}
                    <motion.span className="absolute left-0 right-0 bottom-0 h-px bg-white" initial={{
                  scaleX: 0,
                  originX: 0
                }} whileHover={{
                  scaleX: 1
                }} transition={{
                  duration: 0.3
                }} />
                  </motion.a>
                </motion.li>)}
            </motion.ul>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={0.7}>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with the latest healthcare innovation news and opportunities.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your Email" className="bg-white/20 border-white/10 text-white placeholder:text-gray-400 focus:ring-moh-gold focus:border-moh-gold transition-all" />
              <Button className="bg-moh-gold hover:bg-moh-darkGold">
                Subscribe
              </Button>
            </div>
          </ScrollFadeIn>
        </div>
        
        <motion.div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 1
      }}>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ministry of Health, Kingdom of Saudi Arabia. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <motion.a href="#" className="text-gray-400 hover:text-white text-sm" whileHover={{
            color: "#ffffff",
            scale: 1.05
          }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-white text-sm" whileHover={{
            color: "#ffffff",
            scale: 1.05
          }}>
              Terms of Service
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-white text-sm" whileHover={{
            color: "#ffffff",
            scale: 1.05
          }}>
              Accessibility
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>;
}