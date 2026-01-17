import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowitWorks";
import SuccessStories from "@/components/SuccessStories";
import VerifiAdNumbers from "@/components/VerifiAdNumbers";
import VerifiedAds from "@/components/VerifiedAds";
import WhyVerifiAd from "@/components/WhyVerifiad";


export default function Home() {
  return (
    <div>
      <HomeHero />
      <WhyVerifiAd/>
      <VerifiAdNumbers />
      <HowItWorks />
      <VerifiedAds />
      <SuccessStories />
      <Faq />
      <Footer />  
    </div>

  )
}
