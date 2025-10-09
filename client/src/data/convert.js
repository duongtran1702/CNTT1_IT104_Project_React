const fs = require('fs');

// đọc database.json
const db = JSON.parse(fs.readFileSync('database.json', 'utf-8'));

// convert numeric fields trong foods
db.foods = db.foods.map(item => ({
  ...item,
  calories: Number(item.calories),
  protein: Number(item.protein),
  fat: Number(item.fat),
  carbohydrate: Number(item.carbohydrate)
}));

// ghi lại database.json
fs.writeFileSync('database.json', JSON.stringify(db, null, 2));

console.log('✅ Done! Converted all numeric fields in foods.');
