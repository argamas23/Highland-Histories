

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Register.css';
// // import config from '../globals';

// // const Register = () => {
// //   const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '', usertype: '' }); // Include usertype in credentials
// //   const [formErrors, setFormErrors] = useState({});
// //   const [secretkey, setSecretKey] = useState('');
// //   let pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];

// //   const navigate = useNavigate();

// //   const validateField = (name, value) => {
// //     switch (name) {
// //       case 'name':
// //         return value.length >= 3;
// //       case 'email':
// //         return /\S+@\S+\.\S+/.test(value);
// //       case 'password':
// //         return value.length >= 8;
// //       case 'confirmPassword':
// //         return value === credentials.password;
// //       default:
// //         return true;
// //     }
// //   };

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setCredentials({ ...credentials, [name]: value }); // Update credentials with usertype

// //     if (formErrors[name] && validateField(name, value)) {
// //       setFormErrors({ ...formErrors, [name]: '' });
// //     }
// //   };

// //   const validateForm = () => {
// //     const errors = {};
// //     if (!validateField('name', credentials.name)) errors.name = 'Name must be at least 3 characters';
// //     if (!validateField('email', credentials.email)) errors.email = 'Email address is invalid';
// //     if (!validateField('password', credentials.password)) errors.password = 'Password must be at least 8 characters';
// //     if (!validateField('confirmPassword', credentials.confirmPassword)) errors.confirmPassword = 'Passwords do not match';

// //     setFormErrors(errors);

// //     return Object.keys(errors).length === 0;
// //   };


// // const handleSubmit = async (event) => {
// //   event.preventDefault();
// //   if (credentials.usertype === 'Admin' && secretkey !== config.SECRET_KEY) {
// //     alert("Invalid Admin");
// //   }
// //   if (!validateForm()) return;
// //   const { name, email, password, usertype } = credentials;
// //   if (usertype === 'Admin' && secretkey === config.SECRET_KEY) {
// //     const response = await fetch("https://highlandhistories.org/api/auth/createuser", {
// //       method: 'POST',
// //       headers: {
// //         "Content-Type": 'application/json',
// //       },
// //       body: JSON.stringify({ name, email, password, usertype })
// //     });
// //     const json = await response.json();
// //     // console.log(json);
// //     if (json.success) {
// //       navigate('/');
// //       localStorage.setItem('userId', json.userId)
// //       localStorage.setItem('user',credentials.usertype);
// //     } else {
// //       alert("Invalid credentials");
// //     }
// //   } else if (credentials.usertype === 'User') {
// //     try {
// //       const response = await fetch("https://highlandhistories.org/api/requests/add", {
// //         method: 'POST',
// //         headers: {
// //           "Content-Type": 'application/json',
// //         },
// //         body: JSON.stringify({ name, email, password, usertype })
// //       });
  
// //       const responseText = await response.text();
// //       console.log('Raw response:', responseText);
  
// //       try {
// //         const json = JSON.parse(responseText);
  
// //         if (json.errors) {
// //           alert("Invalid user credentials");
// //           console.error('Validation errors:', json.errors);
// //         } else {
// //           alert("Please wait for Admin to approve");
// //           console.log('Request added:', json);
// //         }
// //       } catch (parseError) {
// //         console.error('Error parsing JSON:', parseError);
// //         alert("An error occurred while processing the response");
// //       }
// //     } catch (error) {
// //       console.error('Error adding request:', error);
// //       alert("An error occurred while saving the request");
// //     }
// //   }
// //   if(usertype == '') {
// //     alert('Please Select UserType');
// //   }
// // };

// //   const secretKey = (event) => {
// //     setSecretKey(event.target.value);
// //   };

// //   return (
// //     <div>
// //       <h2>Register</h2>
// //       <form onSubmit={handleSubmit} noValidate>
// //         <div>
// //           <input
// //             type="radio"
// //             name="usertype"
// //             value="User"
// //             onChange={handleInputChange}
// //           />
// //           User
// //           <input
// //             type="radio"
// //             name="usertype"
// //             value="Admin"
// //             onChange={handleInputChange}
// //           />
// //           Admin
// //         </div>
// //         {credentials.usertype === "Admin" &&
// //           <div>
// //             <input
// //               type="text"
// //               name="secret-key"
// //               placeholder="Secret Key"
// //               value={secretkey}
// //               onChange={secretKey}
// //             />
// //           </div>
// //         }
// //         <div>
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Name"
// //             value={credentials.name}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.name && <p>{formErrors.name}</p>}
// //         </div>
// //         <div>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={credentials.email}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.email && <p>{formErrors.email}</p>}
// //         </div>
// //         <div>
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={credentials.password}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.password && <p>{formErrors.password}</p>}
// //         </div>
// //         <div>
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             placeholder="Confirm Password"
// //             value={credentials.confirmPassword}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
// //         </div>
// //         <button type="submit">Register</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;





// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Register.css';
// // import config from '../globals';

// // const Register = () => {
// //   const [credentials, setCredentials] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     usertype: '',
// //     moreInfo: false,
// //     institute: '',
// //     profession: '',
// //     bio: '',
// //   });
// //   const [formErrors, setFormErrors] = useState({});
// //   const [secretkey, setSecretKey] = useState('');

// //   const navigate = useNavigate();

// //   const validateField = (name, value) => {
// //     switch (name) {
// //       case 'name':
// //         return value.length >= 3;
// //       case 'email':
// //         return /\S+@\S+\.\S+/.test(value);
// //       case 'password':
// //         return value.length >= 8;
// //       case 'confirmPassword':
// //         return value === credentials.password;
// //       case 'bio':
// //         return value.length <= 200;  // Ensure bio is not more than 200 words
// //       default:
// //         return true;
// //     }
// //   };

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setCredentials(prev => ({ ...prev, [name]: value }));
// //     if (formErrors[name] && validateField(name, value)) {
// //       setFormErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const errors = {};
// //     Object.keys(credentials).forEach(key => {
// //       if (!validateField(key, credentials[key])) {
// //         errors[key] = `${key} is invalid`;
// //       }
// //     });

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     if (!validateForm()) return;

// //     const { name, email, password, usertype, institute, profession, bio } = credentials;
// //     const userDetails = { name, email, password, usertype, institute, profession, bio };

// //     if (usertype === 'Admin' && secretkey === config.SECRET_KEY) {
// //       // Handle admin registration
// //     } else if (usertype === 'User') {
// //       // Handle regular user registration
// //     }
// //   };

// //   const handleMoreInfoToggle = () => {
// //     setCredentials(prev => ({ ...prev, moreInfo: !prev.moreInfo }));
// //   };

// //   return (
// //     <div>
// //       <h2>Register</h2>
// //       <form onSubmit={handleSubmit}>
// //         {/* User Type Radio Buttons */}
// //         <div>
// //           <input
// //             type="radio"
// //             name="usertype"
// //             value="User"
// //             onChange={handleInputChange}
// //             checked={credentials.usertype === 'User'}
// //           /> User
// //           <input
// //             type="radio"
// //             name="usertype"
// //             value="Admin"
// //             onChange={handleInputChange}
// //             checked={credentials.usertype === 'Admin'}
// //           /> Admin
// //         </div>

// //         {/* Secret Key for Admin */}
// //         {credentials.usertype === 'Admin' && (
// //           <div>
// //             <input
// //               type="text"
// //               name="secretkey"
// //               placeholder="Secret Key"
// //               value={secretkey}
// //               onChange={e => setSecretKey(e.target.value)}
// //             />
// //           </div>
// //         )}

// //         {/* Name Input */}
// //         <div>
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Name"
// //             value={credentials.name}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.name && <p>{formErrors.name}</p>}
// //         </div>

// //         {/* Email Input */}
// //         <div>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={credentials.email}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.email && <p>{formErrors.email}</p>}
// //         </div>

// //         {/* Password Inputs */}
// //         <div>
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={credentials.password}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.password && <p>{formErrors.password}</p>}
// //         </div>

// //         <div>
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             placeholder="Confirm Password"
// //             value={credentials.confirmPassword}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
// //         </div>

// //         {/* More Info Section */}
// //         {credentials.moreInfo && (
// //           <div>
// //             <input
// //               type="text"
// //               name="institute"
// //               placeholder="Institute"
// //               value={credentials.institute}
// //               onChange={handleInputChange}
// //             />
// //             <input
// //               type="text"
// //               name="profession"
// //               placeholder="Profession"
// //               value={credentials.profession}
// //               onChange={handleInputChange}
// //             />
// //             <textarea
// //               name="bio"
// //               placeholder="200-word bio on why you need access"
// //               value={credentials.bio}
// //               onChange={handleInputChange}
// //             />
// //           </div>
// //         )}

// //         {/* Toggle More Info Button */}
// //         <button type="button" onClick={handleMoreInfoToggle}>
// //           {credentials.moreInfo ? 'Less Info' : 'More Info'}
// //         </button>

// //         {/* Submit Button */}
// //         <button type="submit">Register</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';
// import config from '../globals';

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     usertype: '',
//     moreInfo: false,
//     institute: '',
//     profession: '',
//     bio: '',
//     age: '',  // Added age field
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [secretkey, setSecretKey] = useState('');

//   const navigate = useNavigate();

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'name':
//       case 'institute':
//       case 'profession':
//         return value.trim().length >= 3;
//       case 'email':
//         return /\S+@\S+\.\S+/.test(value);
//       case 'password':
//         return value.length >= 8;
//       case 'confirmPassword':
//         return value === credentials.password;
//       case 'bio':
//         return value.trim().length <= 200;  // Ensure bio is not more than 200 words
//       case 'age':
//         return /^\d+$/.test(value) && parseInt(value, 10) > 0; // Age must be a positive number
//       default:
//         return true;
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCredentials(prev => ({ ...prev, [name]: value }));
//     if (formErrors[name] && validateField(name, value)) {
//       setFormErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     Object.keys(credentials).forEach(key => {
//       if (!validateField(key, credentials[key])) {
//         errors[key] = `${key} is invalid`;
//       }
//     });

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     const { name, email, password, usertype, institute, profession, bio, age } = credentials;
//     const userDetails = { name, email, password, usertype, institute, profession, bio, age };

//     // Process the registration here, handling differently based on user type
//     if (usertype === 'Admin' && secretkey === config.SECRET_KEY) {
//       // Admin registration process
//     } else if (usertype === 'User') {
//       // User registration process
//     }
//   };

//   const handleMoreInfoToggle = () => {
//     setCredentials(prev => ({ ...prev, moreInfo: !prev.moreInfo }));
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         {/* User Type Selection */}
//         <div>
//           <input type="radio" name="usertype" value="User" onChange={handleInputChange} checked={credentials.usertype === 'User'} /> User
//           <input type="radio" name="usertype" value="Admin" onChange={handleInputChange} checked={credentials.usertype === 'Admin'} /> Admin
//         </div>

//         {/* Admin Secret Key Input */}
//         {credentials.usertype === 'Admin' && (
//           <div>
//             <input type="text" name="secretkey" placeholder="Secret Key" value={secretkey} onChange={e => setSecretKey(e.target.value)} />
//           </div>
//         )}

//         {/* Standard User Inputs */}
//         <div>
//           <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={handleInputChange} required />
//           {formErrors.name && <p>{formErrors.name}</p>}
//         </div>
//         <div>
//           <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} required />
//           {formErrors.email && <p>{formErrors.email}</p>}
//         </div>
//         <div>
//           <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} required />
//           {formErrors.password && <p>{formErrors.password}</p>}
//         </div>
//         <div>
//           <input type="password" name="confirmPassword" placeholder="Confirm Password" value={credentials.confirmPassword} onChange={handleInputChange} required />
//           {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
//         </div>

//         {/* More Info Section */}
//         {credentials.moreInfo && (
//           <div>
//             <input type="text" name="institute" placeholder="Institute" value={credentials.institute} onChange={handleInputChange} />
//             <input type="text" name="profession" placeholder="Profession" value={credentials.profession} onChange={handleInputChange} />
//             <textarea name="bio" placeholder="200-word bio on why you need access" value={credentials.bio} onChange={handleInputChange} />
//             <input type="text" name="age" placeholder="Age" value={credentials.age} onChange={handleInputChange} />
//           </div>
//         )}

//         {/* Toggle More Info Button */}
//         <button type="button" onClick={handleMoreInfoToggle}>
//           {credentials.moreInfo ? 'Less Info' : 'More Info'}
//         </button>

//         {/* Submit Button */}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import config from '../globals';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    usertype: '',
    moreInfo: false,
    institute: '',
    profession: '',
    bio: '',
    age: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [secretkey, setSecretKey] = useState('');

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
      case 'institute':
      case 'profession':
        return value.trim().length >= 3;
      case 'email':
        return /\S+@\S+\.\S+/.test(value);
      case 'password':
        return value.length >= 8;
      case 'confirmPassword':
        return value === credentials.password;
      case 'bio':
        return value.trim().length <= 200;  // Ensure bio is not more than 200 words
      case 'age':
        return /^\d+$/.test(value) && parseInt(value, 10) > 0; // Age must be a positive number
      default:
        return true;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (formErrors[name] && validateField(name, value)) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(credentials).forEach(key => {
      if (!validateField(key, credentials[key])) {
        errors[key] = `${key} is invalid`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const { name, email, password, usertype, institute, profession, bio, age } = credentials;
    const userDetails = { name, email, password, usertype, institute, profession, bio, age };

    if (usertype === 'Admin' && secretkey === config.SECRET_KEY) {
      // Admin registration logic with API call
      // Note: Adjust the API URL and handle response accordingly
      try {
        const response = await fetch("https://highlandhistories.org/api/auth/createuser", {
          method: 'POST',
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify(userDetails)
        });
        const json = await response.json();
        if (json.success) {
          navigate('/');
          localStorage.setItem('userId', json.userId);
          localStorage.setItem('user', usertype);
        } else {
          alert("Invalid admin credentials or secret key.");
        }
      } catch (error) {
        console.error('Error during admin registration:', error);
        alert("Failed to register admin.");
      }
    } else if (usertype === 'User') {
      // User registration logic with API call
      try {
        const response = await fetch("https://highlandhistories.org/api/auth/createuser", {
          method: 'POST',
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify(userDetails)
        });
        const json = await response.json();
        if (json.success) {
          navigate('/');
          localStorage.setItem('userId', json.userId);
          localStorage.setItem('user', usertype);
        } else {
          alert("Invalid user credentials.");
        }
      } catch (error) {
        console.error('Error during user registration:', error);
        alert("Failed to register user.");
      }
    }
  };

  const handleMoreInfoToggle = () => {
    setCredentials(prev => ({ ...prev, moreInfo: !prev.moreInfo }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="radio" name="usertype" value="User" onChange={handleInputChange} checked={credentials.usertype === 'User'} /> User
          <input type="radio" name="usertype" value="Admin" onChange={handleInputChange} checked={credentials.usertype === 'Admin'} /> Admin
        </div>
        {credentials.usertype === 'Admin' && (
          <div>
            <input type="text" name="secretkey" placeholder="Secret Key" value={secretkey} onChange={e => setSecretKey(e.target.value)} />
          </div>
        )}
        <div>
          <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={handleInputChange} required />
          {formErrors.name && <p>{formErrors.name}</p>}
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} required />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} required />
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={credentials.confirmPassword} onChange={handleInputChange} required />
          {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
        </div>
        {credentials.moreInfo && (
          <div>
            <input type="text" name="institute" placeholder="Institute" value={credentials.institute} onChange={handleInputChange} />
            <input type="text" name="profession" placeholder="Profession" value={credentials.profession} onChange={handleInputChange} />
            <textarea name="bio" placeholder="200-word bio on why you need access" value={credentials.bio} onChange={handleInputChange} />
            <input type="text" name="age" placeholder="Age" value={credentials.age} onChange={handleInputChange} />
          </div>
        )}
        <button type="button" onClick={handleMoreInfoToggle}>
          {credentials.moreInfo ? 'Less Info' : 'More Info'}
        </button>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
