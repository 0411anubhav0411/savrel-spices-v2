import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Founder from "./pages/Founder";
import Team from "./pages/Team";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import PrivateLabel from "./pages/PrivateLabel";
import Quality from "./pages/Quality";
import Contact from "./pages/Contact";
import AdminEnquiries from "./pages/AdminEnquiries";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
    return null;
};

function App() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/founder" element={<Founder />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:slug" element={<Category />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/private-label" element={<PrivateLabel />} />
                        <Route path="/quality" element={<Quality />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin-enquiries" element={<AdminEnquiries />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <Toaster position="top-center" richColors />
        </div>
    );
}

export default App;
