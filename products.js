function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    alert("Searching for: " + input);
}

function sortByPrice() {
    alert("Sorting by Price");
}

function sortByPopularity() {
    alert("Sorting by Popularity");
}

let cart = [];

function showDetails(description, color, cost, imageUrl, rating, detailedDescription) {
    const modal = document.getElementById('detailsModal');
    const modalImage = document.getElementById('modalImage');
    const descElem = document.getElementById('description');
    const colorElem = document.getElementById('color');
    const costElem = document.getElementById('cost');
    const detailedDescElem = document.getElementById('detailedDescription');

    modalImage.src = imageUrl;
    descElem.textContent = description;
    colorElem.textContent = "Color: " + color;
    costElem.textContent = "Cost: $" + cost;
    detailedDescElem.textContent = detailedDescription;

    updatePrice(); 

    updateStarRating(rating);

    modal.dataset.currentItem = JSON.stringify({
        description, 
        color, 
        cost, 
        imageUrl, 
        rating, 
        detailedDescription
    });

    modal.style.display = "block";
}

function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingFeedback = document.getElementById('rating-feedback');

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    ratingFeedback.textContent = `Rating: ${rating} star${rating > 1 ? 's' : ''}`;
}

function updatePrice() {
    const quantity = document.getElementById('quantity').value;
    const cost = parseFloat(document.getElementById('cost').textContent.replace('Cost: $', ''));
    const totalCostElem = document.getElementById('totalCostValue');

    const totalCost = (quantity * cost).toFixed(2); 
    totalCostElem.textContent = totalCost;
}

function addToCart() {
    const modal = document.getElementById('detailsModal');
    const currentItem = JSON.parse(modal.dataset.currentItem);
    const quantity = document.getElementById('quantity').value;
    const totalCost = (parseFloat(currentItem.cost) * quantity).toFixed(2); 

    cart.push({
        ...currentItem,
        quantity: quantity,
        totalCost: totalCost
    });

    alert(`${currentItem.description} (x${quantity}) has been added to your cart! Total: $${totalCost}`);

    closeModal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    viewCart();
}

function viewCart() {
    const modal = document.getElementById('cartModal');
    const cartList = document.getElementById('cart-list');
    const totalPriceElem = document.getElementById('total-price');
    const orderButton = document.getElementById('orderNowButton');

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty!</p>';
        totalPriceElem.textContent = '';
        orderButton.style.display = 'none';
    } else {
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemElem = document.createElement('div');
            itemElem.innerHTML = `
                <p>${index + 1}. ${item.description} - Color: ${item.color} - $${item.cost} (x${item.quantity}) - Total: $${item.totalCost}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartList.appendChild(itemElem);
            totalPrice += parseFloat(item.totalCost);
        });
        totalPriceElem.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        orderButton.style.display = 'block';
    }
    modal.style.display = "block";
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to your cart before ordering.");
        return;
    }
    alert(`Your order has been placed successfully! Total amount: $${calculateTotalPrice().toFixed(2)}`);
    cart = [];
    viewCart();
}

function calculateTotalPrice() {
    return cart.reduce((total, item) => total + parseFloat(item.totalCost), 0);
}

function closeModal() {
    document.getElementById('detailsModal').style.display = "none";
    document.getElementById('cartModal').style.display = "none";
}

window.onclick = function(event) {
    const detailsModal = document.getElementById('detailsModal');
    const cartModal = document.getElementById('cartModal');
    if (event.target === detailsModal || event.target === cartModal) {
        closeModal();
    }
};
