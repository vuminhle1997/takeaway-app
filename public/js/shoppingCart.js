let buttons = null;
let products = [];

// https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
let shoppingCart = {
    state: [],
    listener: function(val){},
    set insert(product) {
        this.state.push(product);
        this.listener(product);
    },
    get entries() {
        return this.state;
    },
    registerListener: function(listener) {
        this.listener = listener;
    }
};

document.addEventListener("DOMContentLoaded", function(event){
    buttons = document.querySelectorAll(".card-action a");
    const names = document.querySelectorAll(".card-title");
    const descriptions = document.querySelectorAll(".card-content .product-description");
    const categories = document.querySelectorAll(".card-content .product-category");
    const ids = document.querySelectorAll(".hidden");
    const images = document.querySelectorAll(".product-image");

    names.forEach((name, index) => {
        const product = {
            _id: ids[index].value,
            name: name.innerText,
            description: descriptions[index].innerText,
            category: categories[index].innerText,
            image: images[index].src
        }
        products.push(product);
    });

    buttons.forEach((btn, index) => {
        btn.onclick = function(e) {
            btn.classList.toggle("disabled");
            
            shoppingCart
        }
    });

    shoppingCart.registerListener(function(val) {
        console.log(shoppingCart);
    })
});