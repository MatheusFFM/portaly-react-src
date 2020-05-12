//From depedencies
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// From components
import Header from "./components/Header/Header";
import Routes from "./routes";
import Footer from "./components/Footer/Footer";
import Wpp from "./components/WppBtn/WppBtn";
import Carrinho from "./util/Carrinho";
import { persistGate } from "redux-persist/integration/react";

// From css
import "./css/Global.css";

// From Cors
import "cors";

//From redux
import { store, persistor } from "./redux/store";

const rotas = () => {
  Carrinho.resetCarrinho();

  return (
    <Provider store={store}>
      <persistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes />
          <Wpp />
          <Footer />
        </BrowserRouter>
      </persistGate>
    </Provider>
  );
};

ReactDom.render(rotas(), document.getElementById("root"));
