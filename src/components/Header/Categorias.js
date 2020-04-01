//From dependencies
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

//From utils
import ApiWooCommerce from "../../util/ApiWooCommerce";

const ApiCategories = categorias => {
   return (
      <Fragment>
         <li>
            <NavLink
               exact
               key={`Todos`}
               to={`/`}
               activeStyle={{ backgroundColor: "#a1887f" }}
            >
               {`Todos`}
            </NavLink>
         </li>
         {categorias.map(cat => {
            return (
               <li key={cat.id}>
                  <NavLink
                     key={`categorias${cat.id}`}
                     to={`/categoria/${cat.id}`}
                     activeStyle={{ backgroundColor: "#a1887f" }}
                  >
                     {cat.name}
                  </NavLink>
               </li>
            );
         })}
         <li>
            <NavLink
               key={`montesuaporta`}
               to={`/montesuaporta`}
               activeStyle={{ backgroundColor: "#a1887f" }}
            >
               {`Monte Sua Porta`}
            </NavLink>
         </li>
      </Fragment>
   );
};

class Categorias extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categories: []
      };
   }

   componentDidMount() {
      ApiWooCommerce.getAllCategorias().then(res => {
         this.setState({ categories: [...this.state.categories, ...res.data] });
      });
   }

   render() {
      return (
         <ul>
            {this.state.categories.length > 0
               ? ApiCategories(this.state.categories)
               : ""}
         </ul>
      );
   }
}

export default Categorias;
