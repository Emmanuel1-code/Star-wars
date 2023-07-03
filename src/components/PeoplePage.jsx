import React, { useState, useEffect} from 'react';
import './People.css'
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
import personImage from './assets/person.jpg';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faBell, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showingRange, setShowingRange] = useState({
    start: 0,
    end: 0,
    total: 0
  });

  useEffect(() => {
    fetchPeople();
  }, []);

  const navigate = useNavigate();

  const handleStarshipsClick = () => {
    navigate('/starships');
  };

  const fetchPeople = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      setPeople(response.data.results);
      setIsLoading(false);
      setShowingRange({
        start: 1,
        end: response.data.results.length,
        total: response.data.results.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery === '') {
      setSearchResult([]);
      setShowNotFound(false);
    } else {
      const result = people.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(result);
      setShowNotFound(result.length === 0);
      setShowingRange({
        start: 1,
        end: result.length,
        total: result.length
      });
    }
  };
  
  
  return (
    
    <div className="dashboard-container">
       
    <div className="person-sidebar">
    <div className='sidebar-content'>
    <img src={wars2} alt='star-wars' className='wars' />
    <div className='dash-div'>
       <img src={dashboard} alt='image' className='dashboard-image' /> 
       <Link to="/dashboard" className='my-dash-button'>Dashboard</Link>
      
    </div>

    <div>
      <img src={building} alt='image' className='dashboard-building' />
      <button className='mydashbutton' onClick={handleStarshipsClick}>Starships</button>
    </div>

    <div className='side-content'>
    <img src={plant} alt='image' className='dashboard-people' />
    <Link to="/people" className='personspbutton'>People</Link>
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
        People
        
        <div className='icons'>
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
       <FontAwesomeIcon icon={faBell} className="icon" />
       <Link to="/" className="logout-link">
       <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
        </Link>
        </div> 
        <img src={big} alt='image' className='big-N' />
        </div>
    </nav>
    <div className='nav-line'></div>
    <nav className='top-nav'>
    <div className='nav-content1'>
    
    <Link to="/dashboard" className="arrowleft">
    &lt; <div className="back">BACK</div>
  </Link>
   
   
  <div className="total">TOTAL: {people.length}</div>
    <div className="showing">
      SHOWING: {showingRange.start} to {showingRange.end} of {showingRange.total}
    </div>
   <Link to="/starships" className='arrow-left'>&lt;</Link>
   <Link to="/vehicles" className='arrowleft'>&gt;</Link>

            <input
              type="search"
              placeholder="Search for People"
              className="nav-searchbar"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
           <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />

        
 </div>
    </nav>
    <div className="people-page">
      <div className="people-page-container">
        <div className="people-page-layout">
          <div className='big-layout-nav'>
            <ul>
              <li className='name'>Name</li>
              <li className='model'>Birth<br />Year</li>
              <li className='class'>Gender</li>
              <li className='cost'>Eye<br />Color</li>
              <li className='passenger'>Hair<br />Color</li>
              <li className='length'>Height</li>
              <li className='crew'>Mass</li>
              <li className='cargo'>Skin<br />Color</li>
            </ul>
          </div>
          <div className='big-layout-line'></div>
          <div className="people-page-content">
            {isLoading ? (
              <div className='loader-container'>
                <div className='dash-loader'></div>
              </div>
            ) : (

              <>
      {searchResult.length > 0 ? (
        searchResult.map(person => (
          <div key={person.name} className="person-item">
                  
          <input type="checkbox" className="people-checkbox" id="" />
           <img src={personImage} alt='Person' className='person-image' />
           <p className='person-name'>{person.name}</p>
           <p className='birth-year'>{person.birth_year}</p>
           <p className='class'>{person.gender}</p>
           <p className='cost'>{person.eye_color}</p>
           <p className='passenger'>{person.hair_color}</p>
           <p className='length'>{person.height}</p>
           <p className='crew'>{person.mass}</p>
           <p className='cargo'>{person.skin_color}</p>
         </div>
        ))
      ) : showNotFound ? (
        <div className="persons-item">
          <p className="starship-not-available">Name not available</p>
        </div>
      ) : (
            
            
              people.map(person => (
                <div key={person.name} className="person-item">
                  
                 <input type="checkbox" className="people-checkbox" id="" />
                  <img src={personImage} alt='Person' className='person-image' />
                  <p className='person-name'>{person.name}</p>
                  <p className='birth-year'>{person.birth_year}</p>
                  <p className='class'>{person.gender}</p>
                  <p className='cost'>{person.eye_color}</p>
                  <p className='passenger'>{person.hair_color}</p>
                  <p className='length'>{person.height}</p>
                  <p className='crew'>{person.mass}</p>
                  <p className='cargo'>{person.skin_color}</p>
                </div>
              ))
             
              )}
              </>     
            )}
            
          </div>
           
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PeoplePage;