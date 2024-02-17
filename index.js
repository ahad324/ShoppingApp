document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartContainer = document.getElementById("cart-container");
    const cartCountDisplay = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartToggleBtn = document.getElementById("cart-toggle-btn");
    const emptycart = document.getElementById("empty-message");
    let cartCount = 0;
    let total = 0;

    document.querySelector('.switch input').addEventListener('change', function () {
        document.body.classList.toggle('bg-color');
    });
    document.getElementById('filterInput').addEventListener('input', function () {
        const filterValue = this.value.toLowerCase();
        const items = document.querySelectorAll('.item');

        items.forEach(item => {
            const itemName = item.querySelector('h2').textContent.toLowerCase();
            if (itemName.includes(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Toggle cart visibility when the cart button is clicked
    cartToggleBtn.addEventListener("click", function () {
        cartContainer.classList.toggle("active");
    });

    // Function to update cart count
    function updateCartCount(count) {
        count > 0
            ? (emptycart.style.display = "none")
            : (emptycart.style.display = "block");
        cartCountDisplay.textContent = count;
        cartCountDisplay.classList.add("fade-out");
        setTimeout(() => {
            cartCountDisplay.classList.remove("fade-out");
        }, 500);
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            cartCount++;
            updateCartCount(cartCount);

            const item = button.parentElement;
            const itemName = item.querySelector("h2").textContent;
            const itemPrice = parseFloat(
                item.querySelector("p").textContent.slice(1)
            );

            total += itemPrice;
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;

            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                    <span>${itemName} - $${itemPrice.toFixed(2)}</span>
                    <button class="remove-from-cart-btn">Remove</button>
                `;
            cartItemsList.appendChild(cartItem);

            // Trigger animation
            cartItem.classList.add("fade-in");
            setTimeout(() => {
                cartItem.classList.remove("fade-in");
            }, 500); // Duration of the animation in milliseconds

            // Add event listener for remove button
            const removeButton = cartItem.querySelector(
                ".remove-from-cart-btn"
            );
            removeButton.addEventListener("click", function () {
                cartCount--;
                updateCartCount(cartCount);

                total -= itemPrice;
                cartTotal.textContent = `Total: $${total.toFixed(2)}`;

                cartItemsList.removeChild(cartItem);
            });
        });
    });
});

