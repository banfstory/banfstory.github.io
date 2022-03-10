$(function() {
	let header = $('#header');
	let hamburger = $('.hamburger');
	let nav = $('.nav-links');

	// determine if changes to the header is required or not by returning true or false
	function triggerScroll() {
		let position = window.scrollY;
 		if(position > 0) {
			return true;
		} else {
			return false;
		}
	}

	// set header class to scrolled which allows for changes to logo name color and background color of navigation
	function setClassScrolled(state) {
		if(state) {
			header.addClass('scrolled');
		} else {
			header.removeClass('scrolled');
		}
	}

	// change color for the navigation links or hamburger button
	function setHeaderColor(state) {
		if(state) {
			hamburger.addClass('change');
			nav.addClass('change');
		} else {
			hamburger.removeClass('change');
			nav.removeClass('change');
		}
	}

	// this will open up the hamburger menu
	hamburger.click(() => {
		let status = hamburger.hasClass('active');
		if(status) { // hide menu
			let state = triggerScroll();
			setClassScrolled(state);
			setHeaderColor(state);
			hamburger.removeClass('active');
			nav.removeClass('active');
		} else { // show menu
			setHeaderColor(true);
			hamburger.addClass('active');
			nav.addClass('active');
		}
	});

	// will change color for the header when scrolled however if hamburger menu do not change certain elements of the header
	document.addEventListener('scroll', () => {
		let state = triggerScroll();
		setClassScrolled(state);
		let status = hamburger.hasClass('active');
		if(!status || $(window).width() > 991) {
			setHeaderColor(state);
		}
	});

	// default changes when window size is above 991 or page is refreshed
	function defaultChange() {
		let state = triggerScroll();
		setClassScrolled(state);
		setHeaderColor(state);
	}

	// work around for scroll event listener just incase hamburger menu is still active
	$(window).resize(function() {
		if($(window).width() > 991) {
			defaultChange();
		}
	});
	defaultChange();
});

let body = document.getElementsByTagName('body')[0];
let skillShowHide = document.getElementsByClassName('show-hide-all')[0];
let showHideBtn = skillShowHide.getElementsByTagName('button')[0];
let circleGrow = skillShowHide.getElementsByClassName('circle-grow')[0];
let skills = document.getElementById('skills');
let skillItems = skills.getElementsByClassName('skill-items');
let skillsHeader = skills.getElementsByTagName('h2')[0];
let contactMe = document.getElementById('contact-me');
let contactMeBtn = document.getElementsByClassName('contact-me-btn')[0];
let contactMeCloseBtn = contactMe.getElementsByClassName('close')[0];
let hero = document.getElementById('hero');

showHideBtn.onmouseover = () => {
	circleGrow.classList.add('scale-up');
	skillsHeader.classList.add('change-heading-color');
}

showHideBtn.onmouseleave = () => {
	circleGrow.classList.remove('scale-up');
	skillsHeader.classList.remove('change-heading-color');
}

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

contactMeBtn.onclick = () => {
	contactMe.classList.add('fade-in');
	contactMe.classList.remove('fade-out');
	body.classList.add('unscrollable')
}

contactMeCloseBtn.onclick = () => {
	contactMe.classList.remove('fade-in');
	contactMe.classList.add('fade-out');
	body.classList.remove('unscrollable');
}

window.onscroll = () => {
	const rect = hero.getBoundingClientRect();
	if(rect.bottom <= 0) {
		contactMeBtn.classList.add('morph-button');
	} else {
		contactMeBtn.classList.remove('morph-button');
	}
}
