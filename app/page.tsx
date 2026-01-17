import Faq from "@/components/home/Faq";
import Footer from "@/components/home/Footer";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowitWorks";
import SuccessStories from "@/components/home/SuccessStories";
import VerifiAdNumbers from "@/components/home/VerifiAdNumbers";
import VerifiedAds from "@/components/home/VerifiedAds";
import WhyVerifiAd from "@/components/home/WhyVerifiad";


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
