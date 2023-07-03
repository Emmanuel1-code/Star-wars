import React, { useState,useEffect} from 'react'
import './Starship.css';
import wars2 from './assets/wars2.png';
import dashboard from './assets/dashboard.png';
import people from './assets/people.png';
import basket from './assets/basket.png';
import taxi from './assets/taxi.png';
import building from './assets/building.png';
import big from './assets/big.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faBell, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const fetchStarships = async (setStarships, setIsLoading) => {
  try {
    const response = await fetch('https://swapi.dev/api/starships/');
    const data = await response.json();

    // Initialize the checked property for each starship
    const starshipsWithChecked = data.results.map((starship) => ({
      ...starship,
      checked: false,
    }));

    setStarships(starshipsWithChecked);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }
};

const StarshipPage = () => {
  const [starships, setStarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);


  useEffect(() => {
    fetchStarships(setStarships, setIsLoading);
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter the starships based on the search input
  const filteredStarships = starships.filter((starship) =>
    starship.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  

  const handleSearchClick = () => {
    const filteredStarships = starships.filter((starship) =>
      starship.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  
    setIsSearchEmpty(filteredStarships.length === 0);
  };
  

  const handleCheckboxChange = (index) => {
    setStarships((prevStarships) => {
      const updatedStarships = [...prevStarships];
      updatedStarships[index].checked = !updatedStarships[index].checked;
      return updatedStarships;
    });
  };
  
  return (
    <div className="starship-container">
     
      <div className="content">
        <div className="top-layout">
          <div className='top-layout-sidebar'>
          <div className='layout-sidebar-content'>
  <img src={wars2} alt='image' className='wars' />
  <div className='side-content'>
    <img src={dashboard} alt='image' className='dashboard-image' />
    <Link to="/dashboard" className='dashbutton'>Dashboard</Link>
  </div>
  <div className='side-content'>
    <img src={building} alt='image' className='dashboard-building' />
    <Link to="/starships" className='Starshipbutton'>Starships</Link>
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
          <div className='top-layout-main'>
          <nav className="top-nav">
        <div className='top-dashboard'>
        StarShips
         
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
    <nav className='starshiptop-nav'>
  <div className='nav-content1'>
    
  <Link to="/dashboard" className="arrowleft">
    &lt; <div className="back">BACK</div>
  </Link>
    
    
    <div className='total'>
      TOTAL: {starships.length}
    </div>
    <div className='showing'>
      SHOWING: {1} to {starships.length}  of {starships.length}
    </div>
    <Link to="/dashboard" className='arrow-left'>&lt;</Link>
    <Link to="/people" className='arrowleft'>&gt;</Link>

   <input
  type="search"
  placeholder="Search for Starships"
  className="nav-searchbar"
  value={searchInput}
  onChange={handleSearchChange}
/>

        
        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchClick} />
         
  </div>
  
  
        
       
    </nav>
    <div className='top-main'>
      <div className='top-main-content'>
        <div className="top-main-layout">
          <div className='plant-text'>
            Species
             <img src={basket} alt='image' className='plant-image' />
          </div>
          <div className='number-17'>3058</div>
          <div className='film-second-text'> 
            <div className='number-5'>10</div>
            More than yesterday
          </div>
        </div>

      </div>

    </div>
          </div>
          
        </div>
        
        <div className='bottom-main'>
          {isLoading ? (
            <div className='loader-container'>
            <div className='dash-loader'></div>
          </div>
          ) : (

          
           <div className='bottom-main-content'>
           <div className="bottom-main-layout">
          <div className='big-layout-nav'>
              <ul>
                
                <li className='name'>Name</li>
                <li className='model'>Model</li>
                <li className='class'>Class</li>
                <li className='cost'>Cost</li>
                <li className='passenger'>Passenger</li>
                <li className='length'>Length</li>
                <li className='crew'>Crew</li>
                <li className='cargo'>Cargo<br /> Capacity</li>
                <li>Manufacturer</li>
                <li className='speed'>Max<br /> Speed</li>
              </ul>
            </div>
            <div className='big-layout-line'></div>
            <div className='big-layout-content'>
                  

            {filteredStarships.map((starship) => (
                
                <div key={starship.name} className="starship-item">
                   <input
                type="checkbox"
                className="starship-checkbox"
                checked={starship.checked}
                onChange={() => handleCheckboxChange(index)}
              />
                  <p className='names'>{starship.name}</p>
                  <p className='model'>{starship.model}</p>
                  <p>{starship.starship_class}</p>
                  <p className='cost'>{starship.cost_in_credits}</p>
                  <p>{starship.passengers}</p>
                  <p>{starship.length}</p>
                  <p>{starship.crew}</p>
                  <p>{starship.cargo_capacity}</p>
                  <p>{starship.manufacturer}</p>
                  <p>{starship.max_atmosphering_speed}</p>
                </div>
                
                ))}
                </div>
              </div>
          
            </div>

            
             )}
          </div>
          
        </div>
        </div>
      );
    }
    
export default StarshipPage;