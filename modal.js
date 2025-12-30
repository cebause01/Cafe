// Modal Management
// Make functions available globally for inline onclick handlers
window.openBeanModal = function openBeanModal(productId) {
    try {
        // Check if getAllCoffeeBeans is available (from cart.js or shop.js)
        const getAllCoffeeBeansFunc = window.getAllCoffeeBeans || 
                                       (typeof getAllCoffeeBeans === 'function' ? getAllCoffeeBeans : null);
        
        if (!getAllCoffeeBeansFunc) {
            console.error('getAllCoffeeBeans function not found. Make sure cart.js is loaded before modal.js.');
            return;
        }
        const coffeeBeans = getAllCoffeeBeansFunc();
        const product = coffeeBeans.find(b => b.id === productId);
        
        if (!product) {
            console.warn('Product not found:', productId);
            return;
        }
        
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) {
            console.error('Modal elements not found. Make sure productModal and modalContent exist in HTML.');
            return;
        }
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="modal-image" style="background: ${product.image ? 'none' : product.gradient};">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" class="bean-product-image">` : ''}
                ${product.badge ? `<span class="bean-badge">${product.badge}</span>` : ''}
            </div>
            <div class="modal-details">
                <h2>${product.name}</h2>
                <p class="modal-description">${product.description}</p>
                
                <div class="modal-info-section">
                    <h3>Product Details</h3>
                    <div class="modal-details-grid">
                        ${product.details.map(detail => `
                            <div class="modal-detail-item">
                                <span class="detail-label">${detail.split(':')[0] || detail}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-info-section">
                    <h3>Flavor Profile</h3>
                    <p class="modal-flavor">${getFlavorProfile(product.id)}</p>
                </div>
                
                <div class="modal-info-section">
                    <h3>Brewing Recommendations</h3>
                    <p class="modal-brewing">${getBrewingRecommendations(product.id)}</p>
                </div>
                
                <div class="modal-price-section">
                    <span class="modal-price">RM ${product.price.toFixed(2)}</span>
                    <button class="btn btn-primary" id="modalAddToCartBtn" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add event listener for add to cart button
    const addToCartBtn = document.getElementById('modalAddToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const originalText = this.textContent;
            this.disabled = true;
            this.textContent = 'Adding...';
            
            try {
                if (typeof window.addToCart === 'function') {
                    const success = await window.addToCart(productId);
                    if (success) {
                        closeModal();
                    } else {
                        this.textContent = originalText;
                        this.disabled = false;
                    }
                } else {
                    console.error('addToCart function not available');
                    this.textContent = originalText;
                    this.disabled = false;
                }
            } catch (error) {
                console.error('Error adding to cart from modal:', error);
                this.textContent = originalText;
                this.disabled = false;
            }
        });
    }
    } catch (error) {
        console.error('Error opening bean modal:', error);
    }
}

window.openMenuModal = function openMenuModal(itemName, itemPrice, itemDescription, caffeine = null) {
    try {
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) {
            console.error('Modal elements not found. Make sure productModal and modalContent exist in HTML.');
            return;
        }
        
        const menuDetails = getMenuDetails(itemName);
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="modal-image" style="background: linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%);">
            </div>
            <div class="modal-details">
                <h2>${itemName}</h2>
                <p class="modal-description">${itemDescription}</p>
                
                ${caffeine ? `
                <div class="modal-info-section">
                    <h3>Caffeine Content</h3>
                    <p class="modal-caffeine">${caffeine}</p>
                </div>
                ` : ''}
                
                ${menuDetails.ingredients ? `
                <div class="modal-info-section">
                    <h3>Ingredients</h3>
                    <p class="modal-ingredients">${menuDetails.ingredients}</p>
                </div>
                ` : ''}
                
                ${menuDetails.allergens ? `
                <div class="modal-info-section">
                    <h3>Allergen Information</h3>
                    <p class="modal-allergens">${menuDetails.allergens}</p>
                </div>
                ` : ''}
                
                ${menuDetails.customization ? `
                <div class="modal-info-section">
                    <h3>Customization Options</h3>
                    <p class="modal-customization">${menuDetails.customization}</p>
                </div>
                ` : ''}
                
                <div class="modal-price-section">
                    <span class="modal-price">${itemPrice}</span>
                </div>
            </div>
        </div>
    `;
    
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening menu modal:', error);
    }
}

window.closeModal = function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Flavor profiles for coffee beans
function getFlavorProfile(productId) {
    const profiles = {
        1: "Rich notes of chocolate and caramel with a smooth, balanced finish. Medium body with low acidity.",
        2: "Intense smoky flavors with bold, robust characteristics. Full body with deep, dark notes.",
        3: "Bright, fruity flavors with floral undertones. Light body with complex, delicate notes.",
        4: "Bright acidity with berry-like flavors and wine-like complexity. Medium-light body with citrus notes.",
        5: "Nutty and caramel flavors with a clean, well-balanced profile. Medium body with smooth finish.",
        6: "Earthy and spicy notes with full body and low acidity. Smooth, lingering finish.",
        7: "Complex flavor with cocoa, spice, and floral undertones. Medium body with rich texture.",
        8: "Bright and clean with citrus notes and a smooth, sweet finish. Light-medium body.",
        9: "Traditional dark roast with bold, intense flavor. Rich and full-bodied, perfect for espresso.",
        10: "Smooth and mellow with delicate, sweet flavors. Rare and exquisite taste profile.",
        11: "Clean, sweet profile with nutty finish. Certified organic with balanced characteristics.",
        12: "Intense, smoky flavor with very low acidity. Bold character with dark, robust notes."
    };
    return profiles[productId] || "A premium coffee blend with carefully selected characteristics.";
}

// Brewing recommendations
function getBrewingRecommendations(productId) {
    const recommendations = {
        1: "Best brewed with drip coffee maker or pour-over method. Use 1-2 tablespoons per 6 oz of water. Water temperature: 90-96°C.",
        2: "Perfect for espresso machines or French press. Strong, bold flavor shines in concentrated brewing methods.",
        3: "Ideal for pour-over or AeroPress to highlight delicate flavors. Use slightly cooler water (85-90°C).",
        4: "Best with pour-over or Chemex to showcase bright acidity. Coarse grind recommended.",
        5: "Versatile - works well with drip, French press, or pour-over. Standard brewing ratio recommended.",
        6: "Excellent for French press or cold brew. Full body develops well with longer extraction.",
        7: "Great with pour-over or drip methods. Medium-fine grind works best.",
        8: "Ideal for pour-over or AeroPress. Medium grind recommended for optimal extraction.",
        9: "Perfect for espresso machines. Fine grind required for proper extraction.",
        10: "Treat with care - pour-over or drip methods recommended. Use high-quality water.",
        11: "Works well with all brewing methods. Medium grind recommended for versatility.",
        12: "Best for espresso or French press. Very dark roast requires careful brewing."
    };
    return recommendations[productId] || "Brew with your preferred method following standard coffee-to-water ratios.";
}

// Menu item details
function getMenuDetails(itemName) {
    const details = {
        "BforBrew Favorite Latte": {
            ingredients: "Espresso, steamed milk, your choice of syrup (vanilla, caramel, hazelnut, or seasonal flavors)",
            allergens: "Contains dairy. Gluten-free options available.",
            customization: "Available in small, medium, or large. Can be made with oat, almond, or soy milk. Hot or iced."
        },
        "Cold Brew": {
            ingredients: "Premium coffee beans, cold-filtered water, steeped for 18 hours",
            allergens: "None. Dairy-free and gluten-free.",
            customization: "Available black or with milk/cream. Sweetener options available."
        },
        "Cappuccino": {
            ingredients: "Espresso, steamed milk, milk foam",
            allergens: "Contains dairy.",
            customization: "Traditional 1:1:1 ratio of espresso, steamed milk, and foam. Available in single or double shot."
        },
        "Americano": {
            ingredients: "Espresso shots, hot water",
            allergens: "None. Dairy-free and gluten-free.",
            customization: "Single or double shot. Available hot or iced."
        },
        "Mocha": {
            ingredients: "Espresso, steamed milk, chocolate syrup or powder, optional whipped cream",
            allergens: "Contains dairy and may contain gluten if whipped cream is added.",
            customization: "Can be made with dark, milk, or white chocolate. Available hot or iced."
        },
        "Chai Latte": {
            ingredients: "Spiced tea concentrate, steamed milk, honey or sugar",
            allergens: "Contains dairy.",
            customization: "Can be made with oat, almond, or soy milk. Spice level can be adjusted."
        },
        "Espresso": {
            ingredients: "Premium espresso beans, water",
            allergens: "None. Dairy-free and gluten-free.",
            customization: "Single or double shot. Can be served with a twist of lemon."
        },
        "Macchiato": {
            ingredients: "Espresso, dollop of steamed milk foam",
            allergens: "Contains dairy.",
            customization: "Single or double shot. Can be made with caramel or vanilla drizzle."
        },
        "Flat White": {
            ingredients: "Double espresso, microfoam milk",
            allergens: "Contains dairy.",
            customization: "Traditional Australian style with velvety microfoam. Available with alternative milks."
        },
        "Iced Latte": {
            ingredients: "Espresso, cold milk, ice",
            allergens: "Contains dairy.",
            customization: "Available with flavor syrups. Can be made with alternative milks."
        },
        "Iced Mocha": {
            ingredients: "Espresso, chocolate, cold milk, ice, optional whipped cream",
            allergens: "Contains dairy and may contain gluten.",
            customization: "Dark, milk, or white chocolate options available."
        },
        "Matcha Latte": {
            ingredients: "Premium matcha powder, steamed milk, optional sweetener",
            allergens: "Contains dairy.",
            customization: "Can be made with oat, almond, or soy milk. Sweetener options available."
        },
        "Fresh Pastries": {
            ingredients: "Daily selection varies. May include croissants, muffins, scones, or seasonal items",
            allergens: "Contains gluten, dairy, and eggs. May contain nuts.",
            customization: "Selection changes daily. Ask about today's offerings."
        },
        "Breakfast Sandwiches": {
            ingredients: "Fresh eggs, cheese, choice of bacon or sausage, artisan bread",
            allergens: "Contains gluten, dairy, eggs, and meat products.",
            customization: "Can be made with turkey bacon or vegetarian sausage. Bread options available."
        },
        "Avocado Toast": {
            ingredients: "Sourdough bread, smashed avocado, cherry tomatoes, microgreens, optional seasonings",
            allergens: "Contains gluten. Gluten-free bread available upon request.",
            customization: "Can add poached eggs, feta cheese, or balsamic glaze."
        },
        "Quiche": {
            ingredients: "Eggs, cream, cheese, daily rotating fillings (vegetables, meats, or vegetarian options)",
            allergens: "Contains gluten, dairy, and eggs.",
            customization: "Selection changes daily. Vegetarian options always available."
        },
        "Bagel & Cream Cheese": {
            ingredients: "Fresh bagel, choice of plain, herb, or chive cream cheese",
            allergens: "Contains gluten and dairy.",
            customization: "Bagel varieties available. Multiple cream cheese flavor options."
        },
        "Granola Bowl": {
            ingredients: "House-made granola, Greek yogurt, fresh berries, honey",
            allergens: "Contains dairy and may contain nuts. Gluten-free granola available.",
            customization: "Can substitute with coconut yogurt. Additional toppings available."
        },
        "Turkey & Avocado Wrap": {
            ingredients: "Sliced turkey, avocado, lettuce, tomato, chipotle aioli, whole wheat wrap",
            allergens: "Contains gluten and may contain dairy (aioli).",
            customization: "Can be made with gluten-free wrap. Vegetarian options available."
        },
        "Veggie Panini": {
            ingredients: "Roasted vegetables, mozzarella cheese, pesto, ciabatta bread",
            allergens: "Contains gluten and dairy. Pesto may contain nuts.",
            customization: "Can be made without cheese. Gluten-free bread available."
        },
        "Chocolate Croissant": {
            ingredients: "Buttery croissant dough, rich chocolate filling",
            allergens: "Contains gluten, dairy, and eggs.",
            customization: "Available plain or with almond filling variation."
        }
    };
    
    return details[itemName] || {
        ingredients: "Made fresh daily with quality ingredients.",
        allergens: "Please ask staff about specific allergens.",
        customization: "Customization options may be available upon request."
    };
}

