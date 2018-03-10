 /**
	* Open the drawer when the hamburger ison is clicked.
	*/
var hamburger = document.querySelector('#hamburger');
var main = document.querySelector('main');
var drawer = document.querySelector('#drawer');

hamburger.addEventListener('click', function(e) {
	drawer.classList.toggle('open');
	e.stopPropagation();
});
main.addEventListener('click', function() {
	drawer.classList.remove('open');
});
