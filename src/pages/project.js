import React from 'react'
import { Link } from "gatsby"


const Project = () => {
  return (
    <div style={{ 
      backgroundColor: '#D3D3D3', 
      padding: '50px', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column'}}>
      <div style={{ 
        margin: '200px',
        marginTop: '0', 
        marginBottom: '0',
        backgroundColor: 'white', 
        border: '1px solid lightgray', 
        borderRadius: '25px' 
    }}>
      <h1 style={{
          marginTop: '20px'
      }}>YelpCamp Project</h1>
        <section>
            YelpCamp is a web application that allows users to find campsites across the USA. Users can explore a wide variety of campsites, view detailed information about each one, and leave reviews and ratings. The app helps outdoor enthusiasts discover new camping spots and share their experiences.
        </section>
        <ul>
            <li>Searching for campsites by location</li>
            <li>Viewing campground details, including descriptions and photos</li>
            <li>Leaving reviews and ratings for campgrounds</li>
            <li>Creating and managing user accounts</li>
        </ul>
        <section>
            The project is built using <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, and <strong>Bootstrap</strong> for responsive design.
        </section>
        <Link to="/" className="back-to-home">Home Page</Link>
      </div>
    </div>
  )
}

export default Project

