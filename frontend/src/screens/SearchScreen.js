import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { NewProduct } from '../components/NewProduct'
import { Product } from '../components/Product'
import { prices } from '../utils'

export const SearchScreen = ( props ) => {


    const { name = 'all', category = 'all', min = 0, max = 0, order = 'newest', pageNumber = 1 } = useParams();


    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages } = productList;

    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  


    const dispatch = useDispatch()

    useEffect(() => {
        
       dispatch(listProducts({pageNumber, name: name !== 'all' ? name : '', category: category !== 'all' ? category : '', min, max, order  }));


    }, [ dispatch, name, category, min, max, order, pageNumber ]);

  
    const getFilterUrl = (filter) => {
          
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0: min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0: max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
    }



    return (
        <div className="margin">
            <div className="row ">
                {loading? (<LoadingBox/>
                 ) : 
                 error? (<MessageBox variant="danger">{error}</MessageBox>
                 ) : (
                  <div>
                      {products.length} Resultados
                  </div>
                 )}

                 <div>
                     Buscar por { ' ' }
                    <select value={order} onChange={(e) => {props.history.push(getFilterUrl({ order: e.target.value }))}}>
                       <option value="newest"> Nuevos Productos</option>
                       <option value="lowest"> Precio: -bajo a +alto</option>
                       <option value="highest"> Precio: +alto a -bajo</option>
                       {/* <option value="toprated"> avg custumer reviews</option> */}
                    </select>
                 </div>
            </div>

            <div className="row top ">
                <div className="col-1">

                    <h3>Categorias</h3>

                    <div>

                        {loadingCategories ? (<LoadingBox/>
                        ) : 
                        errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                        <ul>
                            <li>
                                <Link
                                    className={'all' === category ? 'active' : ''}
                                    to={getFilterUrl({ category: 'all' })}
                                    >
                                    Any
                                </Link>
                            </li>
                           {categories.map((c) => (
                               <li key={c}>
                                   <Link
                                        className={c === category ? 'active' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >
                                    {c}
                                    </Link>
                               </li>
                           ))}
                        </ul>
                        )}
                     
                    </div>

                    <div>
                    <h3>Precio</h3>

                    <ul>
                        {prices.map((p)=>
                          <li key={p.name}>

                               <Link to={getFilterUrl({min: p.min, max: p.max})} className={`${p.min}-${p.max}` === `${min}-${max}`? 'active':''}
                               >{p.name}
                               </Link>

                          </li>
                        
                        )}
                    </ul>

                    </div>

                </div>

                 <div className="col-3">
                     {loading? (<LoadingBox/>
                     ) : 
                     error? (<MessageBox variant="danger">{error}</MessageBox>
                     ) : (
                        <>
                        {products.length === 0 && <MessageBox>Producto no encontrado</MessageBox>}
              
                        <div className="row center">
                          {
                            products.map(product => (
                  
                              <NewProduct key={product._id} product={product}/>
                        
                            ))
                  
                          }
                        </div>

                        <div className="row center pagination">
                            {
                                [...Array(pages).keys()].map(x => (
                                    <Link key={x+1} className={x+1 === page? 'active' : ''}  to={getFilterUrl({page: x+1})}>
                                        {x+1}
                                    </Link>
                                ))
                            }
                        </div>
                  
                      </>
                     )}
                 </div>
            </div>
        </div>
    )
}
