import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const isCartDisplayed = useSelector((state) => state.cart.isCartDisplayed);
  return (
    <Layout>
      {isCartDisplayed && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
