import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Research from './pages/Research';
import Archives from './pages/Archives';
import Login from './pages/Login'; 
import Register from './pages/Register';
import Search from './pages/Search';
import UploadFile from './pages/UploadFile';
import FileDetails from './pages/FileDetails';
import ConfirmUpload from './pages/ConfirmUpload';
import MyUploads from './pages/MyUploads';
import ArchiveDetail from './pages/ArchiveDetail';
import EditUpload from './pages/EditUpload';
import Permission from './pages/Permission';
import ViewUpload from './pages/ViewUpload';
import Events from './pages/Events';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content"> {/* This div is used for pushing the footer down */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<UploadFile />} />
          {/* <Route path="/" exact component={UploadFile} /> */}
          <Route path="/file-details" element={<FileDetails />} />
          <Route path="/confirm-upload" element={<ConfirmUpload />} />
          {/* <Route path="/confirm-upload" element={ConfirmUpload} /> */}
          <Route path="/my-uploads" element={<MyUploads />} />
          <Route path="/events" element={<Events />} />
          <Route path="/archives/:id" element={<ArchiveDetail />} />
          <Route path="/edit-upload/:id" element={<EditUpload />} />
          <Route path="/permission" element={<Permission />}/>
          <Route path="/view-upload/:id" element={<ViewUpload />} />
          {/* <Route path="/my-uploads" component={Archives} /> */}
        
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

