import React  from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts, loadProductsRequest } from '../../../redux/productRedux';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ProductList from '../ProductList/ProductList'

const ProductSection = () => {
  // const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
console.log('products', products)
  // useEffect(() => {
  //   dispatch(loadProductsRequest());
  // }, [dispatch]);

  if (products === undefined || !products.length) {
    return <Alert color="info">Loading...</Alert>;
  } else if (products.length === 0) {
    return <Alert color="info">No Products</Alert>;
  } else {
    return <ProductList products={products} />;
  }
};



export default ProductSection;

// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import clsx from 'clsx';
// import styles from './NewFurniture.module.scss';
// import ProductBox from '../../common/ProductBox/ProductBox';
// import Swipeable from '../Swipeable/Swipeable';

// const ProductSection = ({ products, screenMode, productsPerPage }) => {
//   const [activePage, setActivePage] = useState(0);
//   const [activeCategory, setActiveCategory] = useState('bed');
//   const [pagesCount, setPagesCount] = useState(0);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [transition, setTransition] = useState(false);

//   useEffect(() => {
//     const filteredProducts = products.filter(item => item.category === activeCategory);
//     setCategoryProducts(filteredProducts);
//     const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
//     setPagesCount(pageCount);
//   }, [activeCategory, products, productsPerPage]);

//   const swipeLeft = () => {
//     if (activePage === pagesCount - 1) return;
//     handlePageChange(activePage + 1);
//   };

//   const swipeRight = () => {
//     if (activePage === 0) return;
//     handlePageChange(activePage - 1);
//   };

//   const handlePageChange = newPage => {
//     setTransition(true);
//     setTimeout(() => {
//       setActivePage(newPage);
//       setTransition(false);
//     }, 500);
//   };

//   const handleCategoryChange = newCategory => {
//     setTransition(true);
//     setTimeout(() => {
//       setActiveCategory(newCategory);
//       setTransition(false);
//       setActivePage(0);
//     }, 500);
//   };

//   const productDisplay = screenMode => {
//     let number = 8;
//     if (screenMode === 'desktop') {
//       number = productsPerPage;
//     } else if (screenMode === 'tablet') {
//       number = 3;
//     } else if (screenMode === 'mobile') {
//       number = 2;
//     }

//     return number;
//   };

//   const dots = [];
//   for (let i = 0; i < pagesCount; i++) {
//     dots.push(
//       <li key={i}>
//         <a
//           onClick={() => handlePageChange(i)}
//           className={i === activePage ? styles.active : ''}
//         >
//           page {i}
//         </a>
//       </li>
//     );
//   }
//   const isFeatured = false;
//   return (
//     <div className={styles.root}>
//       <div className='container'>
//         <div className={styles.panelBar}>
//           <div className='row no-gutters align-items-end'>
//             <div className={`col-auto ${styles.heading}`}>
//               <h3>New furniture</h3>
//             </div>
//             <div className={`col ${styles.menu}`}>
//               <ul>
//                 {categories.map(item => (
//                   <li key={item.id}>
//                     <a
//                       className={item.id === activeCategory ? styles.active : ''}
//                       onClick={() => handleCategoryChange(item.id)}
//                     >
//                       {item.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className={`col-auto ${styles.dots}`}>
//               <ul>{dots}</ul>
//             </div>
//           </div>
//         </div>
//         <Swipeable leftAction={swipeLeft} rightAction={swipeRight}>
//           <div className={clsx(styles.galleryImg, transition ? styles.hidden : '')}>
//             <div className='row'>
//               {categoryProducts
//                 .slice(
//                   activePage * productsPerPage,
//                   (activePage + 1) * productDisplay(screenMode)
//                 )
//                 .map(item => (
//                   <div key={item.id} className='col-sm-6 col-md-4 col-lg-3'>
//                     <ProductBox {...item} isFeatured={isFeatured} />
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </Swipeable>
//       </div>
//     </div>
//   );
// };

// ProductSection.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//     })
//   ),
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//       category: PropTypes.string,
//       price: PropTypes.number,
//       stars: PropTypes.number,
//       promo: PropTypes.string,
//       newFurniture: PropTypes.bool,
//     })
//   ),
//   screenMode: PropTypes.string,
//   productsPerPage: PropTypes.number,
// };




// export default New