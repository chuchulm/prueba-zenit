import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { listProductCategories } from './actions/productActions';
import { signout } from './actions/userActions';
import { AdminRoute } from './components/AdminRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { Searchbox } from './components/Searchbox';
import { CartScreen } from './screens/CartScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { HomeScreen } from './screens/HomeScreen';
import { OrderHistoryScreen } from './screens/OrderHistoryScreen';
import { OrderListScreen } from './screens/OrderListScreen';
import { OrderScreen } from './screens/OrderScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductScreen } from './screens/ProductScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ShippingAddressScreen } from './screens/ShippingAddressScreen';
import { SigninScreen } from './screens/SigninScreen';
import { UserEditScreen } from './screens/userEditScreen';
import { UserListScreen } from './screens/UserListScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="rowHeader align-header">
          <div className="row">
            <div className="divLogo">
              <Link className="" to="/">
                <h1>PRUEBA ZENIT</h1>
              </Link>
            </div>
          </div>

          <div>
            <Route render={({ history }) => <Searchbox history={history}></Searchbox>} />
          </div>

          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>{' '}
                </Link>

                <ul className="dropdown-content">
                  <li>
                    <Link to="profile">Perfil usuario</Link>
                  </li>

                  <li>
                    <Link to="orderhistory">Ordenes</Link>
                  </li>

                  <li>
                    <Link to="/signin" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Vendedor <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productslist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productslist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">User</Link>
                  </li>
                  <li>
                    <Link to="/support">Soporte</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main>
          {/* <Route path="/seller/:id" component={SellerScreen} /> */}
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/product/:id/edit" component={ProductEditScreen} exact />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <Route path="/search/name/:name?" exact component={SearchScreen} />
          <Route path="/search/category/:category?" exact component={SearchScreen} />
          <Route path="/search/category/:category/name/:name" exact component={SearchScreen} />
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            exact
            component={SearchScreen}
          />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/productslist" exact component={ProductListScreen} />
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            exact
            component={ProductListScreen}
          />
          <AdminRoute path="/orderlist" exact component={OrderListScreen} />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <AdminRoute path="/dashboard" component={DashboardScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>

        <footer className="row center">
          <div className="row center">
            <div> &copy;2021 todos los derechos reservados</div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
