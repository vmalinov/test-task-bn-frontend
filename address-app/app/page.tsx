import Image from "next/image";
import styles from "./page.module.css";
import AddressesPage from "./pages/addresses";
import './styles/Main.css';
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <AddressesPage/>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}
