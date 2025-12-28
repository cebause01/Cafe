// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "The Art of Perfect Coffee Brewing at Home",
        date: "January 15, 2025",
        excerpt: "Learn the essential techniques and tips to brew the perfect cup of coffee in your own kitchen. From water temperature to grind size, we cover everything you need to know.",
        gradient: "linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)",
        content: `
            <p>Brewing the perfect cup of coffee at home is an art form that anyone can master with the right knowledge and a bit of practice. At BforBrew, we believe that exceptional coffee should be accessible to everyone, whether you're in our cafe or your own kitchen.</p>
            
            <h3>Water Temperature Matters</h3>
            <p>The ideal water temperature for brewing coffee is between 90-96°C (195-205°F). Water that's too hot will extract bitter compounds, while water that's too cool won't extract enough flavor. A simple way to achieve the right temperature is to boil water and let it sit for 30 seconds before pouring.</p>
            
            <h3>Grind Size: The Key to Extraction</h3>
            <p>Your grind size should match your brewing method. For espresso, you need a fine grind, similar to table salt. For drip coffee, a medium grind works best. For French press, a coarse grind is ideal. The grind size directly affects how quickly water passes through the coffee, which in turn affects extraction.</p>
            
            <h3>Water Quality</h3>
            <p>Good coffee starts with good water. Use filtered water if your tap water has a strong taste or odor. The minerals in water (like magnesium and calcium) help extract flavors from coffee beans. Too much or too little mineral content can affect the taste.</p>
            
            <h3>The Golden Ratio</h3>
            <p>The standard ratio is 1:15 to 1:18 (coffee to water). That means for every gram of coffee, you'll use 15-18 grams of water. For a standard 12-ounce cup, this typically means about 20-24 grams of coffee grounds.</p>
            
            <h3>Brewing Methods</h3>
            <p><strong>Pour-Over:</strong> This method gives you full control over the brewing process. Use a gooseneck kettle for precision pouring, and maintain a steady, circular motion. The entire process should take about 3-4 minutes.</p>
            
            <p><strong>French Press:</strong> Perfect for those who prefer a full-bodied cup. Use coarse grounds, steep for 4 minutes, then press slowly. Be careful not to over-steep, as this can lead to bitterness.</p>
            
            <p><strong>Espresso:</strong> Requires an espresso machine and finely ground coffee. The key is to achieve a 25-30 second extraction time for a perfect shot.</p>
            
            <h3>Pro Tips</h3>
            <ul>
                <li>Always use freshly roasted beans (within 2-3 weeks of roast date)</li>
                <li>Grind your beans just before brewing for maximum freshness</li>
                <li>Clean your equipment regularly to avoid off-flavors</li>
                <li>Experiment with brew times and ratios to find your perfect cup</li>
                <li>Keep a brewing journal to track what works best</li>
            </ul>
            
            <p>Remember, brewing great coffee is a journey. Don't be afraid to experiment and find what works best for your taste preferences. Visit us at BforBrew to experience our expertly brewed coffee and get personalized tips from our baristas!</p>
        `
    },
    {
        id: 2,
        title: "Understanding Coffee Roast Levels",
        date: "January 10, 2025",
        excerpt: "Ever wondered about the difference between light, medium, and dark roasts? Discover how roast levels affect flavor and find your perfect match.",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #A1887F 100%)",
        content: `
            <p>One of the most common questions we hear at BforBrew is, "What's the difference between light, medium, and dark roast coffee?" Understanding roast levels is crucial to finding the coffee that suits your taste preferences.</p>
            
            <h3>Light Roast</h3>
            <p>Light roasts are roasted for the shortest amount of time, typically reaching temperatures of 180-205°C. The beans are light brown in color and have no oil on their surface. Light roasts preserve the original characteristics and flavors of the coffee bean, often resulting in brighter, more acidic, and more complex flavors.</p>
            <p><strong>Characteristics:</strong></p>
            <ul>
                <li>Light brown color</li>
                <li>Higher acidity</li>
                <li>Light body</li>
                <li>Fruity, floral, or tea-like flavors</li>
                <li>Slightly higher caffeine content</li>
            </ul>
            <p><strong>Best for:</strong> Coffee drinkers who enjoy bright, nuanced flavors and want to taste the origin characteristics of the bean.</p>
            
            <h3>Medium Roast</h3>
            <p>Medium roasts reach temperatures of 210-220°C, achieving a balanced flavor profile. This is often called the "American roast" and is the most popular roast level. It strikes a perfect balance between the bean's original flavors and the flavors developed during roasting.</p>
            <p><strong>Characteristics:</strong></p>
            <ul>
                <li>Medium brown color</li>
                <li>Balanced acidity and body</li>
                <li>Well-rounded flavor</li>
                <li>Notes of caramel, chocolate, and nuts</li>
                <li>Moderate caffeine content</li>
            </ul>
            <p><strong>Best for:</strong> Most coffee drinkers, especially those who want a balanced, everyday coffee that's neither too mild nor too strong.</p>
            
            <h3>Dark Roast</h3>
            <p>Dark roasts are roasted to 240°C or higher, producing beans that are dark brown or almost black with visible oil on the surface. The roasting process creates bold, smoky flavors, though some of the bean's original characteristics are lost.</p>
            <p><strong>Characteristics:</strong></p>
            <ul>
                <li>Dark brown to black color</li>
                <li>Oily surface</li>
                <li>Lower acidity</li>
                <li>Full body</li>
                <li>Bold, smoky, or chocolatey flavors</li>
                <li>Slightly lower caffeine content (though this is a common misconception - the difference is minimal)</li>
            </ul>
            <p><strong>Best for:</strong> Those who prefer bold, strong flavors and enjoy espresso or dark, rich coffee.</p>
            
            <h3>Roast Level Misconceptions</h3>
            <p><strong>Caffeine Content:</strong> There's a common myth that darker roasts have more caffeine. Actually, the difference is minimal. Light roasts have slightly more caffeine by volume because the beans are denser, but by weight, they're nearly identical.</p>
            
            <p><strong>Quality:</strong> Darker doesn't mean better quality. All roast levels can produce exceptional coffee - it's about finding what you enjoy. At BforBrew, we carefully select beans that excel at their intended roast level.</p>
            
            <h3>Finding Your Perfect Roast</h3>
            <p>The best way to find your preferred roast level is to try different ones! Visit our cafe or browse our online shop to explore our selection. Our baristas are always happy to help you discover your perfect cup.</p>
            
            <p>At BforBrew, we offer a variety of roast levels to suit every taste. Whether you prefer the bright, complex flavors of a light roast or the bold intensity of a dark roast, we have something for everyone.</p>
        `
    },
    {
        id: 3,
        title: "Welcome to BforBrew: Our Story",
        date: "January 5, 2025",
        excerpt: "Get to know the story behind BforBrew, our passion for quality coffee, and our commitment to the Melaka community.",
        gradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)",
        content: `
            <p>Welcome to BforBrew! We're thrilled to share our story with you and invite you to be part of our coffee journey in the heart of Melaka.</p>
            
            <h3>Our Beginning</h3>
            <p>BforBrew was born from a simple yet powerful idea: everyone deserves access to exceptional coffee, and great coffee brings people together. Founded in Melaka, we set out to create a space where quality coffee meets community connection.</p>
            
            <p>Our name, "BforBrew," reflects our commitment to perfect brewing and our belief that coffee is for everyone. We wanted to create a welcoming space where coffee enthusiasts and casual drinkers alike could come together to enjoy exceptional coffee.</p>
            
            <h3>Our Mission</h3>
            <p>At BforBrew, we're dedicated to:</p>
            <ul>
                <li><strong>Quality:</strong> We source only the finest coffee beans and roast them to perfection</li>
                <li><strong>Community:</strong> We're proud to be part of the Melaka community and support local businesses</li>
                <li><strong>Sustainability:</strong> We're committed to ethical sourcing and environmental responsibility</li>
                <li><strong>Education:</strong> We love sharing our knowledge and passion for coffee with our customers</li>
            </ul>
            
            <h3>Our Location</h3>
            <p>Located at Universiti Teknologi MARA (UiTM) Alor Gajah, BforBrew serves not just the university community but the entire Melaka region. Our cafe provides a cozy, welcoming atmosphere perfect for studying, meeting friends, or simply enjoying a moment of peace with a great cup of coffee.</p>
            
            <h3>What Makes Us Different</h3>
            <p><strong>Expert Roasting:</strong> We carefully select and roast our beans in-house, ensuring the freshest, most flavorful coffee possible.</p>
            
            <p><strong>Local Focus:</strong> As a locally owned business, we're deeply committed to supporting the Melaka community. We source locally when possible and are always looking for ways to give back.</p>
            
            <p><strong>Barista Expertise:</strong> Our team of skilled baristas is passionate about coffee and always happy to help you find your perfect cup or learn more about coffee.</p>
            
            <p><strong>Welcoming Atmosphere:</strong> Whether you're a coffee connoisseur or just discovering coffee, you'll feel at home at BforBrew. We believe coffee is for everyone.</p>
            
            <h3>Looking Forward</h3>
            <p>As we continue to grow, our commitment to quality, community, and exceptional service remains unchanged. We're constantly exploring new coffee origins, perfecting our roasting techniques, and finding new ways to serve our community.</p>
            
            <p>We're excited about the future and grateful for the support of the Melaka community. Whether you're visiting our cafe or enjoying our beans at home, thank you for being part of the BforBrew family.</p>
            
            <p>Come visit us at UiTM Alor Gajah and experience the BforBrew difference. We can't wait to share our passion for coffee with you!</p>
        `
    },
    {
        id: 4,
        title: "Coffee and Community: Building Connections",
        date: "December 28, 2024",
        excerpt: "How BforBrew is more than just a cafe - it's a space where community comes together over great coffee and conversation.",
        gradient: "linear-gradient(135deg, #A1887F 0%, #C19A6B 100%)",
        content: `
            <p>At BforBrew, we believe coffee is more than just a beverage—it's a catalyst for connection, conversation, and community building. Our cafe serves as a gathering place where people from all walks of life come together over their shared love of great coffee.</p>
            
            <h3>The Third Place</h3>
            <p>In coffee culture, the "third place" refers to a social environment beyond home (first place) and work (second place). BforBrew strives to be that third place for our community—a welcoming space where students can study, friends can catch up, professionals can work, and everyone can feel at home.</p>
            
            <p>Located at UiTM Alor Gajah, we're perfectly positioned to serve as this community hub. Students find a quiet corner to study, professors hold office hours over coffee, and local residents come to socialize and enjoy quality time together.</p>
            
            <h3>Community Events</h3>
            <p>We regularly host events that bring our community together:</p>
            <ul>
                <li><strong>Coffee Tastings:</strong> Join us for cupping sessions where we explore different coffee origins and flavors</li>
                <li><strong>Brewing Workshops:</strong> Learn how to brew the perfect cup at home with hands-on workshops</li>
                <li><strong>Local Art Displays:</strong> We feature work from local artists, supporting the creative community</li>
                <li><strong>Study Groups:</strong> Our space is designed to accommodate groups working together</li>
            </ul>
            
            <h3>Supporting Local</h3>
            <p>Being a locally owned business, we're committed to supporting other local businesses. We source ingredients locally when possible and partner with local suppliers. This creates a network of mutual support that strengthens our entire community.</p>
            
            <p>We also collaborate with student organizations and community groups, providing a space for meetings and events. It's our way of giving back to the community that supports us.</p>
            
            <h3>Building Relationships</h3>
            <p>One of the most rewarding aspects of running BforBrew is watching relationships form in our space. We've seen study groups become lifelong friendships, casual conversations turn into business partnerships, and daily regulars become part of our extended family.</p>
            
            <p>Our baristas know many customers by name and remember their usual orders. This personal touch creates a sense of belonging that goes beyond just serving coffee.</p>
            
            <h3>The Conversation Starter</h3>
            <p>Coffee has a unique ability to bring people together. Sharing a cup of coffee breaks down barriers and opens up conversations. Whether you're meeting someone for the first time or catching up with an old friend, coffee provides the perfect setting.</p>
            
            <h3>Join Our Community</h3>
            <p>We invite you to become part of the BforBrew community. Whether you visit us daily or occasionally, you're always welcome. Come in, grab a coffee, find a comfortable seat, and experience what makes BforBrew special.</p>
            
            <p>Follow us on social media to stay updated on events, new offerings, and community happenings. We'd love to connect with you!</p>
            
            <p>At BforBrew, we're not just serving coffee—we're building a community, one cup at a time.</p>
        `
    },
    {
        id: 5,
        title: "Sustainable Coffee Sourcing: Our Commitment",
        date: "December 20, 2024",
        excerpt: "Learn about our ethical sourcing practices and how we support coffee farmers while bringing you the best quality beans.",
        gradient: "linear-gradient(135deg, #5D4037 0%, #8B6F47 100%)",
        content: `
            <p>At BforBrew, we believe that great coffee should be sustainable, ethical, and beneficial for everyone involved in its journey—from the farmers who grow it to you, the customer who enjoys it.</p>
            
            <h3>Our Ethical Sourcing Philosophy</h3>
            <p>Every bean we source comes with a story, and we're committed to ensuring that story is one of fairness, sustainability, and respect. We work directly with coffee cooperatives and farmers who share our values, prioritizing:</p>
            <ul>
                <li>Fair prices for farmers</li>
                <li>Sustainable farming practices</li>
                <li>Environmental protection</li>
                <li>Community development</li>
                <li>Long-term partnerships</li>
            </ul>
            
            <h3>Fair Trade and Direct Trade</h3>
            <p>While we support fair trade principles, we also engage in direct trade relationships whenever possible. Direct trade allows us to build personal relationships with coffee farmers, ensuring they receive fair compensation while we maintain quality control.</p>
            
            <p>By working directly with farmers, we can:</p>
            <ul>
                <li>Pay prices above fair trade minimums</li>
                <li>Provide feedback on quality and flavor profiles</li>
                <li>Support specific community projects</li>
                <li>Build long-term, mutually beneficial relationships</li>
            </ul>
            
            <h3>Sustainable Farming Practices</h3>
            <p>We prioritize coffees from farms that use sustainable practices, including:</p>
            <ul>
                <li><strong>Shade-Grown Coffee:</strong> Preserves biodiversity and provides habitat for wildlife</li>
                <li><strong>Organic Methods:</strong> Reduces chemical use and protects soil health</li>
                <li><strong>Water Conservation:</strong> Efficient water use protects local water sources</li>
                <li><strong>Soil Health:</strong> Practices that maintain and improve soil quality</li>
            </ul>
            
            <h3>Supporting Coffee Communities</h3>
            <p>Our commitment extends beyond the coffee itself. We support initiatives that benefit coffee-growing communities:</p>
            <ul>
                <li>Education programs for farmers and their families</li>
                <li>Healthcare access in rural coffee-growing areas</li>
                <li>Infrastructure improvements (clean water, better roads)</li>
                <li>Economic development projects</li>
            </ul>
            
            <h3>Transparency in Our Supply Chain</h3>
            <p>We believe in transparency. When you buy coffee from BforBrew, you can trust that:</p>
            <ul>
                <li>Farmers receive fair compensation</li>
                <li>Our sourcing practices are ethical and sustainable</li>
                <li>We prioritize quality without compromising our values</li>
                <li>We're committed to continuous improvement</li>
            </ul>
            
            <h3>Climate Impact</h3>
            <p>Coffee farming is particularly vulnerable to climate change. We support farmers who are adapting to changing conditions through:</p>
            <ul>
                <li>Diversification of crops</li>
                <li>Climate-resistant coffee varietals</li>
                <li>Water-efficient processing methods</li>
                <li>Carbon offset programs</li>
            </ul>
            
            <h3>Your Impact</h3>
            <p>When you choose BforBrew, you're supporting:</p>
            <ul>
                <li>Fair wages for coffee farmers</li>
                <li>Sustainable farming practices</li>
                <li>Community development in coffee-growing regions</li>
                <li>Environmental conservation</li>
            </ul>
            
            <p>Every cup of coffee you enjoy from BforBrew contributes to a more sustainable and equitable coffee industry. Together, we're making a difference, one cup at a time.</p>
            
            <h3>Looking Forward</h3>
            <p>Our commitment to sustainable and ethical sourcing is ongoing. We're constantly seeking new partners, exploring innovative farming methods, and finding ways to increase our positive impact.</p>
            
            <p>We're proud of the relationships we've built and the coffee we serve. Thank you for being part of this journey toward a more sustainable coffee future.</p>
        `
    },
    {
        id: 6,
        title: "New Menu Items for 2025",
        date: "December 15, 2024",
        excerpt: "Discover our latest additions to the menu, featuring seasonal flavors and local favorites that celebrate Malaysian tastes.",
        gradient: "linear-gradient(135deg, #6F4E37 0%, #A1887F 100%)",
        content: `
            <p>We're excited to announce our new menu additions for 2025! At BforBrew, we're constantly innovating while staying true to our commitment to quality and local flavors.</p>
            
            <h3>New Coffee Beverages</h3>
            <p><strong>Malaysian Spiced Latte:</strong> Our signature espresso meets warm Malaysian spices including cardamom, star anise, and cinnamon. A perfect blend of our coffee expertise with local flavor traditions.</p>
            
            <p><strong>Coconut Cold Brew:</strong> Refreshing cold brew infused with fresh coconut water and topped with coconut cream. A tropical twist perfect for Melaka's warm climate.</p>
            
            <p><strong>Gula Melaka Cappuccino:</strong> Traditional Malaysian palm sugar (gula melaka) adds a caramel-like sweetness to our smooth cappuccino, celebrating local ingredients.</p>
            
            <h3>New Food Offerings</h3>
            <p><strong>Nasi Lemak Wrap:</strong> Our take on the beloved Malaysian dish, featuring fragrant coconut rice, sambal, peanuts, and anchovies wrapped in a fresh tortilla. Perfect for a quick, satisfying meal.</p>
            
            <p><strong>Kaya Toast Set:</strong> Classic Malaysian breakfast favorite made with artisanal bread, homemade kaya (coconut jam), and a perfect soft-boiled egg. Served with your choice of coffee.</p>
            
            <p><strong>Pandan Cheesecake:</strong> Locally-inspired dessert featuring the fragrant pandan leaf, creating a unique Malaysian twist on a classic dessert.</p>
            
            <p><strong>Chicken Rendang Sandwich:</strong> Tender, slow-cooked chicken rendang served on fresh artisan bread with cucumber and red onion. A flavorful lunch option that showcases Malaysian cuisine.</p>
            
            <h3>Seasonal Specials</h3>
            <p>Throughout the year, we'll be introducing seasonal specials that celebrate:</p>
            <ul>
                <li>Chinese New Year flavors</li>
                <li>Hari Raya specials</li>
                <li>Deepavali-inspired treats</li>
                <li>Malaysia Day celebrations</li>
            </ul>
            
            <h3>Health-Conscious Options</h3>
            <p>We're also expanding our menu to include more health-conscious options:</p>
            <ul>
                <li><strong>Plant-Based Milks:</strong> Oat, almond, and soy milk options for all coffee beverages</li>
                <li><strong>Gluten-Free Options:</strong> Several menu items now available in gluten-free versions</li>
                <li><strong>Lower-Sugar Options:</strong> Natural sweeteners and reduced-sugar alternatives</li>
            </ul>
            
            <h3>Our Commitment to Quality</h3>
            <p>While introducing new items, we maintain our commitment to quality. All new menu items are:</p>
            <ul>
                <li>Made fresh daily with quality ingredients</li>
                <li>Tested and perfected by our team</li>
                <li>Sourced from local suppliers when possible</li>
                <li>Prepared with the same care as our classic menu items</li>
            </ul>
            
            <h3>Feedback Welcome</h3>
            <p>We'd love to hear what you think about our new menu items! Your feedback helps us refine our offerings and create dishes and drinks you'll love. Whether you visit us in person or order online, let us know what you think.</p>
            
            <h3>What's Next</h3>
            <p>This is just the beginning. We have many more exciting additions planned for 2025, including collaborations with local chefs, seasonal specials, and more ways to enjoy our premium coffee.</p>
            
            <p>Visit us at UiTM Alor Gajah to try these new offerings, or check our online menu for availability. We can't wait to share these new flavors with you!</p>
            
            <p>Stay tuned for more exciting announcements throughout the year. Thank you for being part of the BforBrew community!</p>
        `
    }
];

// Open blog post modal
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('blogModalBody');
    
    modalBody.innerHTML = `
        <div class="blog-post-header" style="background: ${post.gradient} !important; background-color: transparent !important;">
            <div class="blog-post-header-content" style="color: #FFFFFF !important;">
                <span class="blog-post-date" style="color: #FFFFFF !important; opacity: 0.95;">${post.date}</span>
                <h1 class="blog-post-title" style="color: #FFFFFF !important; font-size: 2.5rem !important; font-weight: 700 !important; margin: 0 !important;">${post.title}</h1>
            </div>
        </div>
        <div class="blog-post-content">
            ${post.content}
        </div>
        <div class="blog-post-footer">
            <a href="blog.html" class="btn btn-secondary" onclick="closeBlogModal(); return false;">← Back to Blog</a>
            <div class="blog-share">
                <span>Share:</span>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share">Facebook</a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share">Twitter</a>
                <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}" target="_blank" class="social-share">WhatsApp</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to "Read More" links
    document.querySelectorAll('.blog-link').forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = parseInt(this.getAttribute('data-post-id'));
            if (postId) {
                openBlogPost(postId);
            }
        });
    });
    
    // Close modal on outside click
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBlogModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBlogModal();
        }
    });
});

