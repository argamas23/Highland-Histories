// // src/pages/Login.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Here you would add your logic to authenticate the user with your backend.
//     console.log('Login with:', email, password);
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', usertype: '' });
  const navigate = useNavigate();
  const [secretkey, setSecretKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.usertype == 'Admin' && secretkey != 'iiit') {
      alert("Invalid Admin")
    }
    else{
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      console.log(credentials.usertype);
      localStorage.setItem('user', credentials.usertype); // Set user type from the form
      navigate('/');
    } else {
      alert("Invalid credentials");
    }
  }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const secretKey = (event) => {
    setSecretKey(event.target.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            name="usertype" // Use "usertype" as the name for radio buttons
            value="User"
            onChange={onChange}
          />
          User
          <input
            type="radio"
            name="usertype"
            value="Admin"
            onChange={onChange}
          />
          Admin
        </div>
        {credentials.usertype === "Admin" &&
          <div>
            <input
              type="text"
              name="secret-key"
              placeholder="Secret Key"
              value={secretkey}
              onChange={secretKey}
            />
          </div>
        }
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account yet? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
