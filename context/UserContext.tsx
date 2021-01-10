import { useReducer, createContext, useCallback } from 'react'

interface CartObject {
    title: string,
    category: string,
    price: number,
    image: string,
    quantity: number
}

interface ContextProps {
  user: {
    authenticated: boolean,
    userName: string,
    cart: CartObject[]
  },
  addToCart: (title: string, category: string, price: number, image: string) => void
}

const initialState = {
  authenticated: true,
  userName: 'TestUser',
  cart: [
    {
      title: 'GoPro HERO 9 Black',
      category: 'cameras',
      price: 349.99,
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp9_1_c0b10a6e80.jpg',
      quantity: 1,
    },
    {
      title: 'GoPro HERO 8 Black',
      category: 'cameras',
      price: 299.99,
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp8_1_9fe20a6816.jpg',
      quantity: 1,
    },
  ],
}

export const UserContext = createContext<Partial<ContextProps>>({})

const ADD_TO_CART = 'ADD_TO_CART'

const reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    return {
      ...state, cart: [action.payload, ...state.cart],
    }
  }
  return state;
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const addToCart = useCallback(
    (
      title, category, price, image,
    ) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          title,
          category,
          price,
          image,
          quantity: 1,
        },
      });
    },
    [dispatch],
  );

  const value = { user, addToCart }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
