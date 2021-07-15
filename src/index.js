import './styles/index.scss';

const sidebar = document.querySelector('.sidebar');
const categoriesCollection = document.querySelectorAll('.category');
const closingOpeningSidebarButton = document.querySelector(
	'.closing-opening-sidebar-button'
);
const mainContent = document.querySelector('.main-content');
const header = document.querySelector('.header');
const text = header.querySelector('.text');
const couponsContainer = document.querySelector('.coupons-container');
const couponsCollection = document.querySelectorAll('.coupon');

let isClosedSidebar = true;

function closeOpenSidebar() {
	if (isClosedSidebar) {
		isClosedSidebar = false;
		sidebar.classList.remove('closed');
		sidebar.classList.add('open');
		mainContent.classList.add('opened-sidebar');
	} else {
		isClosedSidebar = true;
		sidebar.classList.remove('open');
		sidebar.classList.add('closed');
		mainContent.classList.remove('opened-sidebar');
	}
}

function changeClassListCategory() {
	const thisElement = this;
	const thisHeading = this.querySelector('.heading');
	categoriesCollection.forEach((element) => {
		if (element.id === thisElement.id) {
			element.classList.remove('default');
			element.classList.add('active');
			text.textContent = thisHeading.textContent;
		} else {
			element.classList.remove('active');
			element.classList.add('default');
		}
	});
}
function changeClassListCoupon() {
	const thisElement = this;
	couponsCollection.forEach((element) => {
		if (element.id === thisElement.id) {
			element.classList.remove('default');
			element.classList.add('active');
		} else {
			element.classList.remove('active');
			element.classList.add('default');
		}
	});
}

function scrollContainer() {
	if (this.oldScroll < this.scrollTop) {
		header.classList.add('scrolled-down');
	} else {
		header.classList.remove('scrolled-down');
	}
	this.oldScroll = this.scrollTop;
}

closingOpeningSidebarButton.onclick = closeOpenSidebar;

categoriesCollection.forEach((element) => {
	element.onclick = changeClassListCategory;
});
couponsCollection.forEach((element) => {
	element.onclick = changeClassListCoupon;
});

couponsContainer.onscroll = scrollContainer;
