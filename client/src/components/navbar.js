//<script src="https://cdn.tailwindcss.com"></script>
import {Link} from 'react-router-dom';
function Navbar() {
    return (
      <div>
        <div className="bg-blue-500 flex h-18">
          <div className=' ml-8 font-bold text-2xl font-serif mr-auto'>XYZ dealers</div>  
           <Link to="/plans" ><ul className='px-10 text-white ml-auto text-xl'>Our Plans</ul></Link>
           <Link to="/properties"> <ul className='px-10 text-white text-xl'>our properties</ul></Link>
           <Link to="/contact"> <ul className='px-10 text-white text-xl'>Contact us</ul></Link>
        
            <Link to="/about"><ul className='px-10 text-white text-xl'>About us</ul></Link>
        </div> 
      </div>
    );
  }
  export default Navbar;