import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGetLatLong } from "./redux/sliceGetLatLon";
import { useNavigate } from "react-router";
import { routes } from "@/Routes/routes";

const NavBar = () => {
    const dispatch = useDispatch() ;
    const [ search , setSearch ] = useState('') ;
    const nav = useNavigate();
  return (
    <nav className="nav-bar flex items-center justify-between px-2">
      <div className="flex flex-col p-2 items-start cursor-pointer" onClick={() => nav(routes.SCREEN_HOME)} >
        <span className="font-bold text-2xl heading font-poppins">CLIMATE</span>
        <span className="text-xs relative -top-2 tg">
          predict &nbsp; the &nbsp; unpredictable{" "}
        </span>
      </div>
      <div className="flex border-1 rounded-[30px] search-container shadow-lg">
        <Input
          value={search} 
          placeholder="city,country"
          onChange={( e ) => ( setSearch( e.target.value ) )}
          type="text"
          onKeyUp={(e) => {
             if( e.key === 'Enter' && search.trim().length ) {
                dispatch(fetchGetLatLong(search))
                nav(routes.SCREEN_HOME)
             }
          } }
          className="
          w-0 p-0
          rounded-4xl
    !border-none 
    !outline-none 
    !ring-0 
    !shadow-none 
    !focus:outline-none 
    !focus:ring-0 
    !focus:border-none 
    !focus:shadow-none 
    !focus-visible:ring-0 
    !focus-visible:outline-none 
    !focus-visible:border-none
    search-input"
          name="search"
        />

        <div className="rounded-4xl p-2 bg-purple-600 cursor-pointer search-icon" onClick={() => {
            if( search.trim().length ) {
                nav(routes.SCREEN_HOME)
                dispatch(fetchGetLatLong(search));
            }
        }}>
          <Search size={20} color="white" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
