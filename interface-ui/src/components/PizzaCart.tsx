import { useState } from 'react'

interface Pizza {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

interface CartItem {
  pizza: Pizza
  quantity: number
}

const availablePizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 1,
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Tomato sauce, mozzarella, and pepperoni',
    price: 2,
  },
  {
    id: '3',
    name: 'BBQ Chicken',
    description: 'BBQ sauce, chicken, red onions, and mozzarella',
    price: 3,
  },
  {
    id: '4',
    name: 'Veggie Supreme',
    description: 'Tomato sauce, mozzarella, bell peppers, mushrooms, olives',
    price: 2,
  },
  {
    id: '5',
    name: 'Hawaiian',
    description: 'Tomato sauce, mozzarella, ham, and pineapple',
    price: 2,
  },
  {
    id: '6',
    name: 'Meat Lovers',
    description: 'Tomato sauce, mozzarella, pepperoni, sausage, and bacon',
    price: 3,
  },
]

interface PizzaCartProps {
  onCartUpdate: (items: CartItem[], total: number) => void
}

const PizzaCart = ({ onCartUpdate }: PizzaCartProps) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (pizza: Pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.pizza.id === pizza.id)
      let newCart: CartItem[]

      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newCart = [...prevCart, { pizza, quantity: 1 }]
      }

      const total = newCart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)
      onCartUpdate(newCart, total)
      return newCart
    })
  }

  const removeFromCart = (pizzaId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.pizza.id !== pizzaId)
      const total = newCart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)
      onCartUpdate(newCart, total)
      return newCart
    })
  }

  const updateQuantity = (pizzaId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId)
      return
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.pizza.id === pizzaId ? { ...item, quantity } : item
      )
      const total = newCart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)
      onCartUpdate(newCart, total)
      return newCart
    })
  }

  const total = cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Available Pizzas */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">Select Pizzas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availablePizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-orange-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{pizza.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{pizza.description}</p>
                  <p className="text-lg font-bold text-orange-400">{pizza.price} Leo</p>
                </div>
                <button
                  onClick={() => addToCart(pizza)}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-2xl font-bold mb-4 text-white">Cart</h3>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.pizza.id}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{item.pizza.name}</p>
                  <p className="text-sm text-gray-400">{item.pizza.price} Leo each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                  >
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                  >
                    <i className="fas fa-plus text-sm"></i>
                  </button>
                  <p className="text-orange-400 font-bold ml-4 w-20 text-right">
                    {item.pizza.price * item.quantity} Leo
                  </p>
                  <button
                    onClick={() => removeFromCart(item.pizza.id)}
                    className="ml-2 text-red-400 hover:text-red-300"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold text-gray-300">Total</p>
              <p className="text-2xl font-bold text-orange-400">{total} Leo</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PizzaCart
