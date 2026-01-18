import SauceHeader from './components/SauceHeader';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import DexScreenerChart from './components/DexScreenerChart';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-amber-50 font-sans text-slate-900">
      <SauceHeader />
      <HeroSection />
      <MarqueeBanner />
      <Tokenomics />
      <Roadmap />
      <DexScreenerChart />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
