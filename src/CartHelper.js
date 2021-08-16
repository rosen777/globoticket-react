import UuidStore from "./UuidStore";
import axios from 'axios';
import { mutate } from "swr";

async function _getCart() {
  const response = await axios.get("http://localhost:3333/cart", {
    headers: {
      "X-SESSION-TOKEN": UuidStore.value,
    },
  });

  let cart = response.data;
  return cart;
}

export function addCart(id) {
  fetch(
    "http://localhost:3333/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value
      },
      body: JSON.stringify({
          id: id
        })
      }).then(() => {
          mutate("http://localhost:3333/cart");
      })
  };

  export function updateCart(id, quantity) {
    if(quantity === 0) {
      fetch("http://localhost:3333/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value
        },
        body: JSON.stringify({
          id: id
        })
      }).then(() => {
        mutate("http://localhost:3333/cart");
      })
    } else {
      fetch(
        "http://localhost:3333/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-SESSION-TOKEN": UuidStore.value
          },
          body: JSON.stringify({
            id: id,
            quantity: quantity
          })
      }).then(() => {
        mutate("http://localhost:3333/cart");
      })
    }
  }

  export function deleteCart(id) {
    fetch("http://localhost:3333/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value
      },
      body: JSON.stringify({
        id: id
      })
    }).then(() => {
      mutate("http://localhost:3333/cart");
    })
  }

  export function clearCart() {
    fetch(
      "http://localhost:3333/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value
        }
      }).then(() => {
        mutate("http://localhost:3333/cart");
      })
  }

//   return async function addCartThunk(dispatch, getState) {
//     await axios.post("http://localhost:3333/cart",
//     {
//         id: id
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "X-SESSION-TOKEN": UuidStore.value,
//       },
//     });
//     let cart = await _getCart();
//     dispatch({ type: "refresh", payload: cart });
//   };
// }

// export function updateCart(id, quantity) {
//   return async function updateCartThunk(dispatch, getState) {
//     if (quantity === 0) {
//       await axios.delete("http://localhost:3333/cart", 
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-SESSION-TOKEN": UuidStore.value,
//             },
//             data: {
//                 id: id
//             }
//       });
//     } else {
//       await axios.patch(
//         "http://localhost:3333/cart",
//         {
//           id: id,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-SESSION-TOKEN": UuidStore.value,
//           },
//         }
//       );
//     }

//     let cart = await _getCart();
//     dispatch({ type: "refresh", payload: cart });
//   };
// }

// export function deleteCart(id) {
//   return async function deleteCartThunk(dispatch, getState) {
//     await axios.delete("http://localhost:3333/cart", 
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "X-SESSION-TOKEN": UuidStore.value,
//       },
//       data: {
//           id: id
//       }
//     });

//     let cart = await _getCart();
//     dispatch({ type: "refresh", payload: cart });
//   };
// }

// export function clearCart() {
//   return async function deleteCartThunk(dispatch, getState) {
//     await axios.delete("http://localhost:3333/cart", {
//       headers: {
//         "Content-Type": "application/json",
//         "X-SESSION-TOKEN": UuidStore.value,
//       },
//     });

//     let cart = await _getCart();
//     dispatch({ type: "refresh", payload: cart });
//   };
// }
