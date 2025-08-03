// self invoked function focusing on hamburger and header functionality
(function() {
	let header = document.getElementById('header');
	let hamburger = document.getElementsByClassName('hamburger')[0];
	let nav = document.getElementsByClassName('nav-links')[0];

	// this will open/close up the hamburger menu
	hamburger.onclick = () => {
		let status = hamburger.classList.contains('active');
		if(status) { // hide menu
			let state = triggerScroll();
			setClassScrolled(state);
			setHeaderColor(state);
			hamburger.classList.remove('active');
			nav.classList.remove('active');
		} else { // show menu
			setHeaderColor(true);
			hamburger.classList.add('active');
			nav.classList.add('active');
		}
	}

	// will change color for the header when scrolled
	document.addEventListener('scroll', () => {
		let state = triggerScroll();
		setClassScrolled(state);
		let status = hamburger.classList.contains('active');
		if(!status || window.innerWidth > 991) {
			setHeaderColor(state);
		}
	});

	// work around for scroll event listener just incase hamburger menu is still active
	window.onresize = () => {
		if(window.innerWidth > 991) {
			defaultChange();
		}
	} 

	// determine if changes to the header is required or not by returning true or false
	function triggerScroll() {
		return window.scrollY > 0;
	}

	// set header class to scrolled which allows for changes to logo name color and background color of navigation
	function setClassScrolled(state) {
		if(state) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	// change color for the navigation links or hamburger button
	function setHeaderColor(state) {
		if(state) {
			hamburger.classList.add('change');
			nav.classList.add('change');
		} else {
			hamburger.classList.remove('change');
			nav.classList.remove('change');
		}
	}

	// default changes when window size is above 991 or page is refreshed
	function defaultChange() {
		let state = triggerScroll();
		setClassScrolled(state);
		setHeaderColor(state);
	}
	defaultChange();
})();

// self invoked function focusing on grow/shrinking the circle for the 'show more/less' button as well as showing/hiding skills when button is clicked
(function() {
	let skills = document.getElementById('skills');
	let skillShowHide = document.getElementsByClassName('show-hide-all')[0];
	let showHideBtn = skillShowHide.getElementsByTagName('button')[0];
	let circleGrow = skillShowHide.getElementsByClassName('circle-grow')[0];
	let skillsHeader = skills.getElementsByTagName('h2')[0];

	// this will make the circle grow when hover over
	showHideBtn.onmouseover = () => {
		circleGrow.classList.add('scale-up');
		skillsHeader.classList.add('change-heading-color');
	}

	// this will make the circle shrink when hover out
	showHideBtn.onmouseleave = () => {
		circleGrow.classList.remove('scale-up');
		skillsHeader.classList.remove('change-heading-color');
	}

	// this will show/hide certain items
	showHideBtn.onclick = () => {
		if(skills.classList.contains("show-items")) {
			skills.classList.remove("show-items");
			skills.classList.add("hide-items");
			showHideBtn.innerHTML = "SHOW MORE";
		} else {
			skills.classList.add("show-items");
			skills.classList.remove("hide-items");
			showHideBtn.innerHTML = "SHOW LESS";
		}
	}
})();

// self invoked function focusing on the contact me button when clicked it will show/hide the contact me form, it will also show/hide contact me button (icon) depending on how far it is scrolled
(function() {
	let body = document.getElementsByTagName('body')[0];
	let contactMe = document.getElementById('contact-me');
	let contactMeBtn = document.getElementsByClassName('contact-me-btn')[0];
	let contactMeCloseBtn = contactMe.getElementsByClassName('close')[0];
	let contactMeIconBtn = document.getElementById('contact-me-icon');
	let hero = document.getElementById('hero');

	contactMeBtn.onclick = () => {
		contactMeShow();
	}

	contactMeCloseBtn.onclick = () => {
		contactMeHide();
	}

	contactMeIconBtn.onclick = () => {
		contactMeShow();
	}

	// this will show the contact me form with a fade in effect and makes the page unscrollable
	function contactMeShow() {
		contactMe.classList.add('fade-in');
		contactMe.classList.remove('fade-out');
		body.classList.add('unscrollable')
	}

	// this will hide the contact me form with a fade out effect and makes the page scrollable
	function contactMeHide() {
		contactMe.classList.remove('fade-in');
		contactMe.classList.add('fade-out');
		body.classList.remove('unscrollable');
	}

	// this will show/hide the contact me button (icon) if the window is scrolled to a certain point
	window.onscroll = () => {
		const rect = hero.getBoundingClientRect();
		// if user scrolls to the bottom of the page then hide the contact me button
		if(rect.bottom <= 0 && window.scrollY + window.innerHeight < document.body.scrollHeight) {
			contactMeIconBtn.classList.add('contact-show-btn');
			contactMeIconBtn.classList.remove('contact-hide-btn');
		} else {
			if(contactMeIconBtn.classList.contains('contact-show-btn')) {
				contactMeIconBtn.classList.remove('contact-show-btn');
				contactMeIconBtn.classList.add('contact-hide-btn');
			}
		}
	}
})();
