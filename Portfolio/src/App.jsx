import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HeaderComponent from './Components/HeaderComponent'
import HeroSection from './Components/HeroSection'
import { PortfolioSection } from './Components/ServicessSection'
import Project from './Components/Project'
import Footer from './Components/Footer'
import ScrollToHash from './ScroolToHash'
import LoginPage from './adminpanel/pages/LoginPage'
import RegisterForm from './adminpanel/Forms/RegisterForm'
import ProjectForm from './adminpanel/Forms/ProjectForm'
import Blog from './Components/Blog'
import BlogForm from './adminpanel/Forms/BlogPostForm'
import ProjectViewPage from './Components/view_pages/ProjectViewPage'
import BlogViewWrapper from './Components/view_pages/BlogViewWrapper'
import LogoutPage from './adminpanel/pages/LogoutPage'
//

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        {/* Main Home Page Route */}
        <Route path="/" element={
          <>
          
            <HeaderComponent/>
            <HeroSection/>
            <PortfolioSection/>
            <Footer/>
          </>
        } />
        
        {/* Portfolio Items Page Route */}
        <Route path="/portfolio" element={
          <>
           <HeaderComponent/>
          <Project />
           <Footer/>
          </>
        } />
         <Route path="/project_view_page/:id" element={
          <>
           <HeaderComponent/>
          <ProjectViewPage/>
           <Footer/>
          </>
        } />

        <Route path="/blog/view/:id" element={
          <>
           <HeaderComponent/>
         <BlogViewWrapper/>
           <Footer/>
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/createproject" element={<ProjectForm />} />
       <Route path="/blog" element={
          <>
           <HeaderComponent/>
          <Blog />
           <Footer/>
          </>
        } />
 <Route path="/createblog" element={<BlogForm />} />

        
      </Routes>
    </Router>
  )
}

export default App
