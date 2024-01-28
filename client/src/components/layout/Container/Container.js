import MainBanner from '../MainBanner/MainBanner';
import Footer from '../Footer/Footer';

const Container = ({ children }) => (
  <div>
    <MainBanner />
    {children}
    <Footer />
  </div>
);

export default Container;
