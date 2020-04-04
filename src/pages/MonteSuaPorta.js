import React, { Component, Fragment } from "react";
// import ApiWooCommerce from "../util/ApiWooCommerce";
// import LineLoaging from "../components/loading/LineLoading";
import Carrinho from "../util/Carrinho";
import Setepper from "../components/Stepper";

class MonteSuaPorta extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
         paginaId: props.match.params.id,
      };
   }

   mostraMontagemPorta() {
      return <Setepper />;
   }

   render() {
      Carrinho.setCarrinho();

      return <Fragment>{this.mostraMontagemPorta()}</Fragment>;
   }
}

export default MonteSuaPorta;
