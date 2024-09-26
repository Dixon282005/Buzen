import { useState } from 'react'
import './Navbar.css'
import './colors.css'

const Navbar = () => (
    <nav>
<form>
<img class="lens" color="red" src="search-svgrepo-com.svg"/>
<button class="lenBehind" type="submit"></button>
<input class="bar" placeholder="Search"/>
</form>
<a class="log session" href="lobby">LOG IN</a>  
<a class="sign session" href="lobby">SIGN UP</a>
<a class="appLogo">
BU
</a>  
</nav>

);

export default Navbar

