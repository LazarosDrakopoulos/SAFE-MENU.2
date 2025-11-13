// Retrieve user-selected allergens (from allergens.html)
const userAllergens = JSON.parse(localStorage.getItem('userAllergens')) || [];

// Define known allergens
const knownAllergens = [
  "milk","eggs","peanuts","tree nuts","soybeans","gluten","fish",
  "crustaceans","molluscs","celery","mustard","sesame seeds","lupin","sulphites"
];

// Full 25-dish hotel menu
const menu = [
  { name: "Margherita Pizza", ingredients: ["Flour", "Tomato", "Mozzarella", "Basil", "Milk"] },
  { name: "Caesar Salad", ingredients: ["Lettuce", "Croutons", "Parmesan", "Eggs", "Anchovies"] },
  { name: "Peanut Butter Cookie", ingredients: ["Flour", "Sugar", "Peanuts", "Eggs", "Butter"] },
  { name: "Grilled Salmon", ingredients: ["Salmon", "Lemon", "Olive Oil", "Salt"] },
  { name: "Vegetable Stir Fry", ingredients: ["Broccoli", "Carrots", "Soy Sauce", "Sesame Seeds"] },
  { name: "Chicken Curry", ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Celery"] },
  { name: "Beef Tacos", ingredients: ["Beef", "Tortilla", "Cheddar", "Tomato", "Lettuce", "Gluten"] },
  { name: "Shrimp Paella", ingredients: ["Shrimp", "Rice", "Peas", "Bell Pepper", "Crustaceans"] },
  { name: "Mushroom Risotto", ingredients: ["Rice", "Mushrooms", "Butter", "Parmesan", "Milk"] },
  { name: "Chocolate Cake", ingredients: ["Flour", "Cocoa", "Eggs", "Milk", "Tree Nuts"] },
  { name: "Greek Salad", ingredients: ["Tomato", "Cucumber", "Onion", "Feta", "Olives", "Milk"] },
  { name: "Spaghetti Carbonara", ingredients: ["Pasta", "Eggs", "Parmesan", "Bacon", "Gluten"] },
  { name: "Beef Burger", ingredients: ["Beef", "Bun", "Cheddar", "Onion", "Gluten", "Milk"] },
  { name: "Chicken Caesar Wrap", ingredients: ["Chicken", "Lettuce", "Croutons", "Eggs", "Gluten"] },
  { name: "Seafood Pasta", ingredients: ["Pasta", "Shrimp", "Mussels", "Crustaceans", "Gluten"] },
  { name: "Tomato Soup", ingredients: ["Tomatoes", "Cream", "Milk", "Celery"] },
  { name: "Club Sandwich", ingredients: ["Bread", "Chicken", "Eggs", "Lettuce", "Gluten"] },
  { name: "Apple Pie", ingredients: ["Flour", "Apple", "Sugar", "Butter", "Gluten"] },
  { name: "Vanilla Ice Cream", ingredients: ["Milk", "Cream", "Sugar", "Eggs"] },
  { name: "Garlic Bread", ingredients: ["Flour", "Butter", "Garlic", "Parsley", "Gluten"] },
  { name: "Lamb Chops", ingredients: ["Lamb", "Rosemary", "Olive Oil", "Salt"] },
  { name: "Pancakes", ingredients: ["Flour", "Milk", "Eggs", "Butter", "Gluten"] },
  { name: "Tuna Salad", ingredients: ["Tuna", "Lettuce", "Eggs", "Mustard", "Fish"] },
  { name: "Cheesecake", ingredients: ["Cream Cheese", "Sugar", "Eggs", "Milk", "Gluten"] },
  { name: "Vegetable Soup", ingredients: ["Carrots", "Potatoes", "Celery", "Onions"] },
];

// Select the menu container
const menuGrid = document.getElementById('menuGrid');
menuGrid.innerHTML = ""; // clear any existing content

// Filter and display dishes
menu.forEach(dish => {
  let hasAllergen = false;

  // If user has allergens, filter dishes
  if (userAllergens.length > 0) {
    hasAllergen = dish.ingredients.some(ing =>
      userAllergens.some(a => a.toLowerCase() === ing.toLowerCase())
    );
  }

  // Show all if user has no allergens
  if (!hasAllergen) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    const title = document.createElement('h3');
    title.textContent = dish.name;
    card.appendChild(title);

    const ul = document.createElement('ul');
    dish.ingredients.forEach(ing => {
      const li = document.createElement('li');

      // Bold allergens, normal text otherwise
      if (knownAllergens.includes(ing.toLowerCase())) {
        li.innerHTML = `<strong>${ing}</strong>`;
      } else {
        li.textContent = ing;
      }

      ul.appendChild(li);
    });

    card.appendChild(ul);
    menuGrid.appendChild(card);
  }
});
