import React, { useState,useEffect} from 'react'
import './Specie.css';
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


const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);
  const [speciesCount, setSpeciesCount] = useState(0);
  const [speciesRange, setSpeciesRange] = useState({ start: 0, end: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchSpecies = async (start, end) => {
    try {
      const response = await fetch(`https://swapi.dev/api/species/?page=${start / 10 + 1}`);
      const data = await response.json();

      setSpecies(data.results);
      setSpeciesCount(data.count);
      setSpeciesRange({ start, end });
      setIsLoadingSpecies(false);
    } catch (error) {
      console.error('Error fetching species data:', error);
      setIsLoadingSpecies(false);
    }
  };

  const handlePrevious = () => {
    const newStart = Math.max(speciesRange.start - 10, 0);
    const newEnd = newStart + 10;
    fetchSpecies(newStart, newEnd);
  };

  const handleNext = () => {
    const newStart = speciesRange.start + 10;
    const newEnd = Math.min(speciesRange.end + 10, speciesCount);
    fetchSpecies(newStart, newEnd);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    filterSpecies(); // Update filteredSpecies based on the search query
    setSearchPerformed(true); // Set searchPerformed to true after clicking the search icon
  };

  const filterSpecies = () => {
    const filtered = species.filter((specie) =>
      specie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecies(filtered);
    setSearchPerformed(true); // Set searchPerformed to true after filtering
  };

  useEffect(() => {
    filterSpecies();
  }, [searchQuery, species]);

  useEffect(() => {
    fetchSpecies(0, 10);
  }, []);


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
  <Link to="/vehicles" className='vehiclebutton'>Vehicles</Link>
</div>

  <div className='side-content'>
    <img src={basket} alt='image' className='speciebasket' />
    <Link to="/species" className='Starshipbutton'>Species</Link>
  </div>
</div>

          </div>
          <div className='top-layout-main'>
          <nav className="top-nav">
        <div className='top-dashboard'>
        Species
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
    <div className="nav-content1">
    <Link to="/dashboard" className="arrowleft">
    &lt; <div className="back">BACK</div>
  </Link>
  
  <div className="total">TOTAL: {speciesCount}</div>
  <div className="showing">
      SHOWING: {speciesRange.start + 1} to {speciesRange.end} of {speciesCount}
    </div>
    <Link  className="arrow-left" onClick={handlePrevious}>
          &lt;
        </Link>
        <Link  className="arrowleft" onClick={handleNext}>
          &gt;
        </Link>

        <input
  type="search"
  placeholder="Search for Species"
  className="nav-searchbar"
  value={searchQuery}
  onChange={handleSearchChange}
/>

        
<FontAwesomeIcon
  icon={faSearch}
  className="search-icon"
  onClick={handleSearchIconClick} // Add this line to call the handleSearchIconClick function
/>

         
  </div>
  
  
        
       
    </nav>
    <div className='top-main'>
      <div className='top-main-content'>
        <div className="top-main-layout">
          <div className='plant-text'>
            Species
            
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
        {isLoadingSpecies ? (
    <div className="loader-container">
      <div className="dash-loader"></div>
    </div>
  ) : (
    <div className="bottom-main-content">
      
        <div>
        {searchPerformed && filteredSpecies.length === 0 && searchQuery !== '' ? (
    <div>Species not found</div>
  ) : (
        <div className="bottom-main-layout">
          <div className="big-layout-nav">
          <ul>
              <li className="specie-name">Name</li>
              <li className="specie-class">Classification</li>
              <li className="design">Designation</li>
              <li className="ave-height">Average<br />Height</li>
              <li className="ave-life">Average<br />Lifespan</li>
              <li className="skin">Skin<br />Color</li>
              <li className="eyes">Eye<br />Color</li>
              <li className="hair">Hair<br />Color</li>
              <li className="language">Language</li>
            </ul>
          </div>
            <div className='big-layout-line'></div>
            <div className='big-layout-content'>
            {filteredSpecies.map((specie) => (
        <div key={specie.name} className="specie-item">
           <input type="checkbox" className="people-checkbox" id="" />
          <p className='speciename'>{specie.name}</p>
          <p className='specieclass'> {specie.classification}</p>
          <p className='speciedesign'> {specie.designation}</p>
          <p className='specieheight'> {specie.average_height}</p>
          <p className='specielife'> {specie.average_lifespan}</p>
          <p className='specieskin'> {specie.skin_colors}</p>
          <p className='specieeye'>{specie.eye_colors}</p>
          <p className='speciehair'> {specie.hair_colors}</p>
          <p className='specielanguage'>{specie.language}</p>
        </div>
      ))}
           
            </div>
            
          </div>
        
          )}
         </div> 
      </div>
      
          )}
      </div>
     </div>         
    </div>
  );
}
export default SpeciesPage;