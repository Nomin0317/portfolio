import React from 'react'
import { Link } from 'gatsby'

const Skills = () => (
    <div style={{ backgroundColor: '#D3D3D3', padding: '50px' }}>
    <div style={{ 
      margin: '200px', 
      marginTop: '0', 
      marginBottom: '0',
      backgroundColor: 'white', 
      border: '1px solid lightgray', 
      borderRadius: '25px' 
    }}>
       
      <h1>Skills</h1> 

      <h3>Front-End Development</h3>

        <ul>
            HTML: Proficient in creating semantic and accessible web pages.
            CSS: Experienced in styling websites with responsive design techniques.
            JavaScript: Knowledgeable in building dynamic and interactive user interfaces.
            React: Skilled in developing single-page applications using React components.
        </ul>

        <h3>Back-End Development</h3>

        <ul>
            Node.js: Familiar with building server-side applications using Node.js.
            Express.js: Experienced in creating RESTful APIs with Express.js.
            MongoDB: Knowledgeable in database design and management with MongoDB.
        </ul>

        <h3>Version Control</h3>

        <ul>
            Git: Proficient in using Git for version control and collaboration on projects.
            itHub: Experienced in hosting and managing projects on GitHub.
        </ul>

        <h3>Other Tools</h3>

        <ul>  
            Firebase: Familiar with using Firebase for authentication and database services.
            Postman: Experienced in testing APIs and managing requests.
        </ul>

        <h3>Soft Skills</h3>

        <ul>
            Problem-Solving: Strong ability to troubleshoot and resolve issues effectively.
            Teamwork: Experience collaborating with peers on projects, fostering a positive team environment.
            Communication: Effective communication skills to explain technical concepts clearly.
        </ul>
        <Link to="/" className="back-to-home">Home Page</Link>
    </div>
 </div>
)


export default Skills