import UuidStore from "./UuidStore";

async function _getCart() {
  const response = await fetch("http://localhost:3333/cart", {
    method: "GET",
    headers: {
      "X-SESSION-TOKEN": UuidStore.value,
    },
  });

  let cart = await response.json();
  return cart;
}

export function addCart(id) {
  return async function addCartThunk(dispatch, getState) {
    await fetch("http://localhost:3333/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function updateCart(id, quantity) {
  return async function updateCartThunk(dispatch, getState) {
    if (quantity === 0) {
      await fetch("http://localhost:3333/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    } else {
      await fetch("http://localhost:3333/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
        body: JSON.stringify({
          id: id,
          quantity: quantity,
        }),
      });
    }

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function deleteCart(id) {
  return async function deleteCartThunk(dispatch, getState) {
    await fetch("http://localhost:3333/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function clearCart() {
  return async function deleteCartThunk(dispatch, getState) {
    await fetch("http://localhost:3333/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}
