import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Services from '@/components/sections/Services';
import Solutions from '@/components/sections/Solutions';
import TrustedBy from '@/components/sections/TrustedBy';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Solutions />
      <TrustedBy />
      <Newsletter />
    </main>
  );
}
