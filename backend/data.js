import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'john',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
  ],

  products: [
    {
      name: 'Ferrari 488',
      category: 'VEHICULOS ',
      image: '/images/488.jpg',
      price: 2,
      countInStock: 0,
      brand: 'FERRARI',
      rating: 5,
      numReviews: 4,
      description: 'producto de alta calidad',
    },

    {
      name: 'Ferrari GTC4LUSSO',
      category: 'VEHICULOS',
      image: '/images/GTC4Lusso.jpg',
      price: 1.5,
      countInStock: 10,
      brand: 'Ferrari',
      rating: 4.5,
      numReviews: 8,
      description: 'producto de alta calidad',
    },

    {
      name: 'Ferrari LaFerrari',
      category: 'VEHICULOS',
      image: '/images/LaFerrari.jpg',
      price: 8,
      countInStock: 5,
      brand: 'Ferrari',
      rating: 5,
      numReviews: 5,
      description: 'producto de alta calidad',
    },

    {
      name: 'Ferrari Portofino',
      category: 'VEHICULOS',
      image: '/images/Portofino.jpg',
      price: 1.5,
      countInStock: 15,
      brand: 'Ferrari',
      rating: 2.5,
      numReviews: 9,
      description: 'producto de alta calidad',
    },

    {
      name: 'Ferrari SF90 ',
      category: 'Bandanas',
      image: '/images/SF90.jpg',
      price: 1.5,
      countInStock: 8,
      brand: 'Ferrari',
      rating: 3.5,
      numReviews: 10,
      description: 'producto de alta calidad',
    },
  ],
};

export default data;
