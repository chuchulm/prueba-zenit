import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder } from '../actions/orderActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const OrderScreen = (props) => {
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  console.log(orderDetails);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox varirant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Envio</h2>
                <p>
                  <strong>Nombre:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Direccion:</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>

                {order.isDelivered ? (
                  <MessageBox variant="success">Entregado {order.deliveredAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger"> No enviado</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Pago</h2>
                <p>
                  <strong>Metodo: </strong>
                  {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <MessageBox variant="success">Pagado {order.paidAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger">No pagado</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Productos </h2>

                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img src={item.image} alt={item.name} className="small" />
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Orden</h2>
              </li>

              <li>
                <div className="row">
                  <div>Total</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Envio</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>IVA</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Total orden</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>

              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  <button type="button" onClick={deliverHandler} className="primary block">
                    Confirmar entrega
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
