# e-plantShopping

**Project name: e-plantShopping** — Paradise Nursery is an online plant shop built with React and Redux Toolkit.

Paradise Nursery is a shopping cart application for an online plant shop. The
application allows customers to browse houseplants grouped by category, view
plant details, add items to a shopping cart, and manage cart contents with
quantity, deletion, and checkout actions.

## Project Features

- Plant catalog grouped into three categories: Indoor, Succulents, and Air Purifying.
- At least six unique plants per category, each with a thumbnail image, name, and price.
- Add-to-cart controls with disabled state after the first add and a live cart counter.
- Cart page that shows thumbnails, names, unit prices, quantity steppers, total cost per
  item, a delete control, a "Coming Soon" checkout, and a continue-shopping link.
- Responsive navigation bar with Home, Plants, and Cart links.
- Landing page with company name and a "Get Started" button that flips the view to the
  product list using `setShowProductList(true)`.

## Tech Stack

- React 18 with functional components and hooks.
- Redux Toolkit for the shopping cart slice (`addItem`, `removeItem`, `updateQuantity`).
- React Router for client-side navigation.
- Plain CSS for the visual theme and background image.

## Project Structure

```
e-plantShopping/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── ProductList.jsx
│   │   ├── CartItem.jsx
│   │   └── AboutUs.jsx
│   ├── redux/
│   │   └── CartSlice.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── data/plants.js
├── package.json
└── README.md
```

## Getting Started

```
npm install
npm start
```

Open http://localhost:3000 to view the application.
