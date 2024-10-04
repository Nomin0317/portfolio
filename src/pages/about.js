import React from 'react'
import { Link } from "gatsby"

const About = () => {
return (
  <div style={{ 
    backgroundColor: '#D3D3D3', 
    padding: '50px', 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center',
    flexDirection: 'column'
    }}>
  <div style={{ 
    margin: '200px', 
    marginTop: '0', 
    marginBottom: '0',
    backgroundColor: 'white', 
    border: '1px solid lightgray', 
    borderRadius: '25px' 
  }}>
     <h2>
      <b>About Me</b>
    </h2>
      <p>
        Hello! My name is Nomin Altankhuyag, and I am a passionate 24-year-old full-stack web developer. Since 2023, I have been immersed in the world of web development, continuously expanding my skills and knowledge.
      </p>
      <p> 
        Currently, I am enrolled in  web development bootcamp course, where I am learning essential technologies and frameworks that are vital for building modern web applications.

          One of my exciting projects is Yelp Camp, a platform where users can search for campsites, review their experiences, and connect with other camping enthusiasts. This project allows me to apply my knowledge in real-world scenarios and refine my development skills.

          I am eager to continue growing in this field and look forward to contributing to meaningful projects that impact users positively.

          Feel free to explore my portfolio and connect with me!
    </p>
    <Link to="/" className="back-to-home">Home Page</Link>
  </div>
  </div>
)
}

export default About


