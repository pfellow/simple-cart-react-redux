import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={toggleCartHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
