import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import FallingPetals from "./components/FallingPetals";
import Hero from "./components/Hero";
import Letter from "./components/Letter";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#f472b6",
          borderRadius: 16,
          fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
        },
      }}
    >
      <FallingPetals />
      <main className="relative z-10">
        <Hero />
        <Letter />
        <Gallery />
        <Footer />
      </main>
    </ConfigProvider>
  );
}
