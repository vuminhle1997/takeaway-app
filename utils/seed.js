const fauna = require("faunadb"),
    q = fauna.query;
const readLine = require("readline-sync");
const Client = fauna.Client;

const SECRET = readLine.question("Enter your FaunaDB secret: > ", {hideEchoBack: true});
const db = new Client({secret:SECRET});
const collection = "products";

const dummy_products = [
    {
        name: "Pho Hanoi",
        description: "Vietnamese Soup, traditional dish inspired by Hanoian cuisine",
        category: "Soup",
        price: 7.50,
        image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
    },
    {
        name: "Shawarma",
        description: "Oriental specialty",
        category: "Food",
        price: 4,
        image: "https://images.unsplash.com/photo-1542444256-164bd32f11fc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhd2FybWF8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Bubble Tea",
        description: "Delicious drink with tapioca perls",
        category: "Drinks",
        price: 4.90,
        image: "https://images.unsplash.com/photo-1599536837271-f3e08bd0fac5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YnViYmxlJTIwdGVhfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Schnitzel",
        description: `German "Klassikier"`,
        category: "Food",
        price: 8.00,
        image: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c2Nobml0emVsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
        name: "American Burger",
        description: "with BBQ, Eggs, roasted onions and BBQ Sauce",
        category: "Food",
        price: 6,
        image: "https://images.unsplash.com/photo-1565060299583-08dd3af8e3cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBidXJnZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },

    {
        name: "Pad Thai",
        description: "Best Pad Thai around the world",
        category: "Food",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Edamame",
        description: "Japanese Appetizer",
        category: "Appetizer",
        price: 4,
        image: "https://images.unsplash.com/photo-1575262599410-837a72005862?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZWRhbWFtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Bubble Tea without Cream",
        description: "Delicious drink without Cream",
        category: "Drinks",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1599536837271-f3e08bd0fac5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YnViYmxlJTIwdGVhfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Bibimbap",
        description: `Delicious korean dish`,
        category: "Food",
        price: 13.00,
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmliaW1iYXB8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Kimchi",
        description: "Korean Appetizer",
        category: "Appetizer",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1583224944844-5b268c057b72?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8a2ltY2hpfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },

    {
        name: "Berlin Special",
        description: "A splice of the Berlin Special, a fancy cake!",
        category: "Snack",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1847&q=80"
    },
    {
        name: "Peruian Coffee",
        description: "The best organic coffee from Cusco",
        category: "Drinks",
        price: 4,
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Ice Cream Special",
        description: "A sugar bomb milkshake with many rewards!",
        category: "Drinks",
        price: 6.90,
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3NoYWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "TWICE Wonderland",
        description: `A sugary drink, be cautious, TOO CUTE!"`,
        category: "Drinks",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1YmJsZSUyMHRlYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
        name: "Red Wine",
        description: "A red wine from France",
        category: "Drinks",
        price: 6,
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwd2luZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },

    {
        name: "Italian Pasta",
        description: "Italian Pasta, simple!",
        category: "Food",
        price: 7.5,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Burrito",
        description: "Mexican Food with chicken and salad",
        category: "Food",
        price: 4,
        image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVycml0b3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Banh mi Ga",
        description: "Vietnamese sandwich with chicken",
        category: "Food",
        price: 4.90,
        image: "https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YmFuaCUyMG1pfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Uncle Roger's Fried Rice",
        description: `A special dish made by Uncle Roger himself"`,
        category: "Food",
        price: 69.00,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGZyaWVkJTIwcmljZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
        name: "Pommes Frites",
        description: "Simple, isn't it?",
        category: "Appetizer",
        price: 3,
        image: "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9tbWVzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
];


setTimeout(async() => {
    await dummy_products.forEach((product, index) => {
        const createQuery = db.query(
            q.Create(collection, {
                data: product
            })
        );
    
        createQuery.then(res => {
            console.log(`Element of index: ${index} created`);
        }).catch(err => console.error(err));
    });
}, 1000);

