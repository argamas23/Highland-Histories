// // src/components/PrivateRoute.js

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../utils/useAuth';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useAuth(); 

//   return (
//     <Route
//       {...rest}
//       render={(props) => 
//         currentUser ? <Component {...props} /> : <Navigate to="/login" replace />
//       }
//     />
//   );
// };

// export default PrivateRoute;
