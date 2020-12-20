$(function() {
	let header = $('#header');
	document.addEventListener('scroll', () => {
		let position = window.scrollY;
		if (position > 100) {
			header.css('background-color', 'white');
			header.addClass('scrolled');
		} else {
			header.css('background-color', 'transparent');
			header.removeClass('scrolled');
		}
	});
});