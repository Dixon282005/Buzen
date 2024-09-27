import { useState } from 'react'
import './Navbar.css'
import './colors.css'

const Navbar = () => (

<div>
<svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
<section class="options">
</section>
<section>
</section>
<nav>
<label for="send">
<svg class="magnifyingGlass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
</label>
<form>
<button id="send" class="send" type="submit"></button>
<input class="bar" placeholder="Search"/>
</form>
<a class="log session" href="lobby">LOG IN</a>  
<a class="sign session" href="lobby">SIGN UP</a>
<a class="appLogo" href="">
BU
</a>  
</nav>
</div>
);

export default Navbar

