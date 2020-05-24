import {
  ADD_CART,
  REMOVE_CART,
  UPDATE_QUANTIDADE,
  SALVA_KIT,
} from "./actionsTypes";

export function addCart(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    if (produtoExiste(produto, getState()))
      dispatch(add(produto, quantidade, variacao));
  };
}

export function removeCart(produtoId) {
  return function (dispatch, getState) {
    if (quantidadeValida(getState())) dispatch(remove(produtoId));
  };
}
export function updateQuantidade(produtoId, flag) {
  return function (dispatch, getState) {
    dispatch({
      type: UPDATE_QUANTIDADE,
      novoCarrinho: mudaquantidade(getState(), produtoId, flag),
    });
  };
}

export function addKit(kit) {
  const idKit = criaIdKit(kit.produtos);
  const kitTratado = trataKit(kit);
  return function (dispatch) {
    dispatch({
      type: SALVA_KIT,
      payload: { [idKit]: kitTratado },
    });
  };
}

function trataKit(kit) {
  let kitTratado = {};
  let produtos = {};
  Object.values(kit.produtos).map((produto) => {
    produtos = {
      ...produtos,
      [produto.slug]: [produto],
    };
  });

  kitTratado = {
    produtos: produtos,
    valorKit: kit.valorKit,
    quantidade: kit.quantidade,
  };

  return kitTratado;
}

function criaIdKit(produtos) {
  let id = "";
  Object.values(produtos).map((produto) => {
    id += produto.id;
  });
  return id;
}

function mudaquantidade(state, produtoId, flag) {
  let carrinho = state.carrinho;
  let novaQuantidade, newCart;

  newCart = novoCarrinho(produtoId, state);

  newCart.quantidadeTotal =
    flag === "aumenta" ? addQuantidade(state) : diminuiQuantidade(state);

  if (newCart.quantidadeTotal < 1) return carrinho;

  Object.values(carrinho).map((prod) => {
    if (prod.produto && prod.produto[0].id == produtoId) {
      //NÃO MUDE PARA ===
      novaQuantidade = novaQuant(flag, prod);

      if (novaQuantidade < 1) return carrinho;

      newCart.valorTotal = valorTotalUpadate(
        carrinho.valorTotal,
        prod,
        novaQuantidade
      );
      prod.quantidade = novaQuantidade;
      newCart = {
        ...newCart,
        [prod.produto[0].slug]: prod,
      };
    }
  });

  if (novaQuantidade < 1) return carrinho;

  return newCart;
}

function novaQuant(flag, produto) {
  if (flag === "aumenta") return produto.quantidade + 1;
  if (flag === "diminui") return produto.quantidade - 1;
}

function valorTotalUpadate(valorTotal, produto, novaQuantidade) {
  return (valorTotal =
    valorTotal -
    produto.quantidade * produto.produto[0].price +
    novaQuantidade * produto.produto[0].price);
}

function add(produto, quantidade, variacao) {
  return function (dispatch, getState) {
    dispatch({
      type: ADD_CART,
      payload: produto,
      name: produto.name,
      quantidade: quantidade,
      variacao: variacao,
      valorTotal: calculaValorTotal(
        produto.price,
        quantidade,
        getState().carrinho.valorTotal
      ),
      quantidadeTotal: addQuantidadeComParametro(getState(), quantidade),
    });
  };
}

function remove(produtoId) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_CART,
      novoState: novoCarrinho(produtoId, getState()),
    });
  };
}

function novoCarrinho(produtoId, state) {
  let carrinho = {
    quantidadeTotal: 0,
    valorTotal: 0,
  };
  Object.values(state.carrinho).map((prod) => {
    if (prod.produto && produtoId != prod.produto[0].id) {
      //NÃO MUDE PARA !==, pois quebra a função
      carrinho = {
        ...carrinho,
        quantidadeTotal: diminuiQuantidade(state),
        valorTotal: calculaValorTotal(prod.produto[0].price, prod.quantidade),
        [prod.produto[0].slug]: prod,
      };
    }
  });
  return carrinho;
}

function quantidadeValida(state) {
  return !!state.carrinho.quantidadeTotal;
}

function produtoExiste(produto, state) {
  for (const produtoName in state.carrinho) {
    if (produto.name === produtoName) return false;
  }

  return true;
}

function calculaValorTotal(price, quantidade, valorTotal = 0) {
  return valorTotal + parseFloat(price) * quantidade;
}

function addQuantidadeComParametro(state, quantidade) {
  return state.carrinho.quantidadeTotal + quantidade;
}

function addQuantidade(state) {
  return state.carrinho.quantidadeTotal + 1;
}

function diminuiQuantidade(state) {
  return state.carrinho.quantidadeTotal - 1;
}
