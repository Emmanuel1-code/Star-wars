import React, { useState, useEffect} from 'react';
import './Dashboard.css';
import wars2 from './assets/wars2.png';
import dashboard from './assets/dashboard.png';
import camera from './assets/camera.png';
import ufo from './assets/ufo.png';
import people from './assets/people.png';
import taxi from './assets/taxi.png';
import plant from './assets/plant.png';
import building from './assets/building.png';
import basket from './assets/basket.png';
import big from './assets/big.png';
import axios from 'axios';
import person from './assets/person.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const DashboardPage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleStarshipsClick = () => {
    navigate('/starships');
  };

   useEffect(() =>{
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/films');
        setFilms(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log('Error occured while fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchFilms();
   }, []);

   
   




  return (
    <div className="dashboard-container">
    <div className="sidebar">
    <div className='sidebar-content'>
    <img src={wars2} alt='star-wars' className='wars' />
    <div className='dash-div'>
       <img src={dashboard} alt='image' className='dashboard-image' /> 
      <button className='Dashboard-button'>Dashboard</button>
      
    </div>

    <div>
      <img src={building} alt='image' className='dashboard-building' />
      <button className='dash-button' onClick={handleStarshipsClick}>Starships</button>
    </div>

    <div className='side-content'>
    <img src={people} alt='image' className='dashboard-people' />
    <Link to="/people" className='peoplebutton'>People</Link>
  </div>

  <div className='side-content'>
  <img src={taxi} alt='image' className='dashboard-taxi' />
  <Link to="/vehicles" className='vehiclebutton'>Vehicles</Link>
</div>

<div className='side-content'>
    <img src={basket} alt='image' className='speciebasket' />
    <Link to="/species" className='speciesbutton'>Species</Link>
  </div>
   </div>
    </div>
    <div className="content-container">
    <nav className="top-nav">
        <div className='top-dashboard'>
        Dashboard
        
      
        <img src={big} alt='image' className='big-N' />
        </div>
    </nav>
    <div className='nav-line'></div>
    <nav className='top-nav'>
       <div className='nav-content'>
        <div className='current-year'>
          Current Year
          <span className="current-year-icon">&#9660;</span>
        </div>
        <div className='current-week'>
          Current Week
          <span className="current-year-icon">&#9660;</span>
          </div>
       </div>
    </nav>
    <div className="main-container">
      <div className="small-layout-container">
        <div className="small-layout">
         <div className='film-text'>
          Films
           <img src={camera} alt='image' className='film-camera' />
         </div>
         <div className='number-17'>17</div>
         <div className='film-second-text'>
          <div className='number-5'>1</div>
          More than yesterday
         </div>
        </div>
        <div className="small-layout">
        <div className='ufo-text'>
          StarShips
          <img src={ufo} alt='image' className='ufo' />
        </div>
        <div className='number-17'>57</div>
        <div className='film-second-text'>
          <div className='number-5'>5</div>
          More than yesterday
          </div>
        </div>
        
        <div className="small-layout">
         <div className='people-text'>
          People
          <img src={people} alt='image' className='people-image' />
         </div>
         <div className='number-17'>17394</div>
         <div className='film-second-text'>
          <div className='number-5'>429</div>
          More than yesterday
         </div>
        </div>
       
        <div className="small-layout">
         <div className='taxi-text'>
          Vehicles 
           <img src={taxi} alt='image' className='taxi-image' />

         </div>
         <div className='number-17'>329</div>
         <div className='film-second-text'>
            <div className='number-5'> 17</div>
          More than yesterday
         </div>
        </div>
        

      </div>
    </div>

    <div className='big-content'>
    <div className="big-layout-container1">
        <div className="big-layout">
          <div className='plant-text'>
            Species
             <img src={plant} alt='image' className='plant-image' />
          </div>
          <div className='number-17'>3058</div>
          <div className='film-second-text'> 
            <div className='number-5'>10</div>
            More than yesterday
          </div>
        </div>
        
      </div>
      <div className="big-layout-container2">
       {isLoading ? (
        <div className='loader-container'>
          <div className='dash-loader'></div>
        </div>
       ) : (
      
        <div className="big-layout">
          <div className='big-layout-nav'>
            <ul>
              <li>Film Title</li>
              <li>Director</li>
              <li>Producer</li>
              <li className='release-date'>Release <br />Date</li>
              <li>Episode <br />ID</li>
            </ul>
            <div className='big-layout-line'></div>
            <div className='big-layout-content2'>
              {films.map((film,index) => (
                  <div className={`big-layout-content2 ${film.checked ? 'selected' : ''}`} key={index}>
                  <div className="film-div">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={film.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                      <img src={camera} alt='image' className='big-layout-camera' />
                      
                  <div className="film-info">
                    <div className="film-details">
                      
                      <p>
                        {film.title}
                        
                      </p>
                    </div>
                  </div>
                  <div className="film-info">
            
                    <div className="film-details">
                      <p>
                      <img src={person} alt='image' className='film-detail-image' />
                        {film.director}
                        </p>
                      
                    </div>
                    
                  </div>
                  <div className="film-info">
                    <div className="film-details">
                      <p className='producer'>
                      <img src={person} alt='image' className='film-detail-image' />
                        {film.producer}
                        </p>
                    </div>
                  </div>
                  <div className="film-info">
                    <div className="film-details">
                      <p>{film.release_date}</p>
                    </div>
                  </div>
                  <div className="film-info">
                    <div className="film-details">
                      <p>{film.episode_id}</p>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       )}
       </div>
    </div>
  </div>
</div>
);
};

export default DashboardPage;