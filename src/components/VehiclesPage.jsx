import React, { useState,useEffect} from 'react'
import './Vehicle.css';
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


const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchedVehicle, setSearchedVehicle] = useState(null);
  const [isVehicleNotFound, setIsVehicleNotFound] = useState(false);
  const [showingRange, setShowingRange] = useState({
    start: 0,
    end: 0,
    total: 0
  });

  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/vehicles/');
      const data = await response.json();

      // Initialize the checked property for each vehicle
      const vehiclesWithChecked = data.results.map((vehicle) => ({
        ...vehicle,
        checked: false
      }));

      setVehicles(vehiclesWithChecked);
      setIsLoadingVehicles(false);
      setShowingRange({
        start: 1,
        end: vehiclesWithChecked.length,
        total: vehiclesWithChecked.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoadingVehicles(false);
    }
  };

  const handlePrevious = () => {
    const newStart = Math.max(showingRange.start - 10, 0);
    const newEnd = newStart + 10;
    setShowingRange({
      start: newStart + 1,
      end: newEnd,
      total: showingRange.total
    });
  };

  const handleNext = () => {
    const newStart = showingRange.start + 10;
    const newEnd = Math.min(showingRange.end + 10, showingRange.total);
    setShowingRange({
      start: newStart + 1,
      end: newEnd,
      total: showingRange.total
    });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredVehicles = vehicles.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  
    if (filteredVehicles.length > 0) {
      setSearchedVehicle(filteredVehicles);
      setIsVehicleNotFound(false);
    } else {
      setSearchedVehicle(null);
      setIsVehicleNotFound(true);
    }
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
    <Link to="/starships" className='speciesbutton'>Starships</Link>
  </div>
  <div className='side-content'>
    <img src={people} alt='image' className='dashboard-people' />
    <Link to="/people" className='peoplebutton'>People</Link>
  </div>
  <div className='side-content'>
  <img src={taxi} alt='image' className='dashboard-taxi' />
  <Link to="/vehicles" className='Starshipbutton'>Vehicles</Link>
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
        Vehicles
        
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

  <div className="total">TOTAL: {vehicles.length}</div>
            <div className="showing">
              SHOWING: {showingRange.start} to {showingRange.end} of {showingRange.total}
            </div>
    <Link  className="arrow-left" onClick={handlePrevious}>
          &lt;
        </Link>
        <Link  className="arrowleft" onClick={handleNext}>
          &gt;
        </Link>


    <input
     type="search"
       placeholder="Search for Vehicles"
        className="nav-searchbar"
          value={searchInput}
          onChange={handleSearchChange}
                
  
/>

        
<FontAwesomeIcon
                  icon={faSearch}
                  className="search-icon"  onClick={handleSearchClick}  />
         
  </div>
  
  
        
       
    </nav>
    <div className='top-main'>
      <div className='top-main-content'>
        <div className="top-main-layout">
          <div className='plant-text'>
            Vehicles
            
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
        
        <div className="bottom-main">
          {isLoadingVehicles ? (
            <div className="loader-container">
              <div className="dash-loader"></div>
            </div>
          ) : (
            <div className="bottom-main-content">
            {isVehicleNotFound ? (
          <div className="starship-not-available">
            Vehicle not found!
          </div>
        ) : (
                <div className="bottom-main-layout">
                {searchedVehicle ? (
    <div key={vehicles.name} className="vehicle-item">
      <input type="checkbox" className="vehicle-checkbox" id={searchedVehicle.name} />
      <p className="vehicle-name">{vehicles.name}</p>
      <p className="vehicle-model">{vehicles.model}</p>
      <p className="vehicle-manufacturer">{vehicles.manufacturer}</p>
      <p className="vehicle-length">{vehicles.length}</p>
      <p className="vehicle-max-speed">{vehicles.max_atmosphering_speed}</p>
      <p className="vehicle-crew">{vehicles.crew}</p>
      <p className="vehicle-passenger">{vehicles.passengers}</p>
      <p className="vehicle-cargo-capacity">{vehicles.cargo_capacity}</p>
      <p className="vehicle-class">{vehicles.vehicle_class}</p>
      </div>
            ) : (
                <div>
                  <div className="big-layout-nav">
                    <ul>
                      <li className="name">Name</li>
                      <li className="model">Model</li>
                      <li className="class">Manufacturer</li>
                      <li className="vehicle-length">Length</li>
                      <li className="length">Max Speed</li>
                      <li className="crew">Crew</li>
                      <li className="cargo">Passenger</li>
                      <li className="speed">Cargo Capacity</li>
                      <li className="speed">Vehicle Class</li>
                    </ul>
                  </div>
                  <div className="big-layout-line"></div>
                  <div className="big-layout-content">
                  {vehicles.map((vehicle) => (
          <div key={vehicle.name} className="vehicle-item">
            <input type="checkbox" className="vehicle-checkbox" id={vehicle.name} />
                        <p className="vehicle-name">{vehicle.name}</p>
                <p className="vehicle-model">{vehicle.model}</p>
                <p className="vehicle-manufacturer">{vehicle.manufacturer}</p>
                <p className="vehicle-length">{vehicle.length}</p>
                <p className="vehicle-max-speed">{vehicle.max_atmosphering_speed}</p>
                <p className="vehicle-crew">{vehicle.crew}</p>
                <p className="vehicle-passenger">{vehicle.passengers}</p>
                <p className="vehicle-cargo-capacity">{vehicle.cargo_capacity}</p>
                <p className="vehicle-class">{vehicle.vehicle_class}</p>
                </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
          )} 
      </div>
        
      </div>
    </div>
  );
};

export default VehiclePage;


