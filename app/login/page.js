import Footer from "../../components/layout/footer/Footer";
import Navigation from "../../components/layout/header/Header";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return(
    <div>
      <Navigation/>
      <LoginForm />
      <Footer/>
    </div>
  )
}
