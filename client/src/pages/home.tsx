import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ChatWidget from "@/components/chat-widget";
import ChatPopup from "@/components/chat-popup";
import AgentsSection from "@/components/agents-section";
import AdvantagesSection from "@/components/advantages-section";
import TargetSection from "@/components/target-section";
import IntegrationsSection from "@/components/integrations-section";
import HowItWorksSection from "@/components/how-it-works-section";
import PoweredBySection from "@/components/powered-by-section";
import FinalCTASection from "@/components/final-cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060606]">
      <Header />
      <HeroSection />
      <ChatWidget />
      <AgentsSection />
      <AdvantagesSection />
      <TargetSection />
      <IntegrationsSection />
      <HowItWorksSection />
      <PoweredBySection />
      <FinalCTASection />
      <Footer />
      <ChatPopup />
    </div>
  );
}

<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '706592518905036');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=706592518905036&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->

export default FormularioPage;

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5TVCDJ2');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P5TVCDJ2"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->