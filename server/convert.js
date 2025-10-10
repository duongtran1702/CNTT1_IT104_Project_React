// convertRecipeImages.js
// Chạy: node convertRecipeImages.js
// Mục đích: gán lại field `image` cho mỗi recipe trong database.json
// URLs là ảnh "food" random (không tải về, chỉ gán link)

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'database.json');

// CHỌN nguồn ảnh:
// false -> Unsplash Source (https://source.unsplash.com) (mặc định, kết quả đẹp)
// true  -> LoremFlickr (https://loremflickr.com) (nhiều ảnh food, cũng được)
const USE_LOREMFLICKR = false;

// Mảng từ khóa món ăn để tăng đa dạng (sẽ kết hợp với seed)
const foodKeywords = [
  'pizza',
  'pasta',
  'salad',
  'sushi',
  'burger',
  'ramen',
  'tacos',
  'steak',
  'dessert',
  'noodles'
];

function makeUnsplashUrl(keyword, seed) {
  // https://source.unsplash.com/800x600/?food,pizza&sig=12345
  // note: Unsplash Source ignores sig sometimes but using seed+keyword still gives variety
  const q = `food,${encodeURIComponent(keyword)}`;
  return `https://source.unsplash.com/800x600/?${q}&sig=${seed}`;
}

function makeLoremFlickrUrl(keyword, seed) {
  // https://loremflickr.com/800/600/food,pizza?random=12345
  const tags = `food,${encodeURIComponent(keyword)}`;
  return `https://loremflickr.com/800/600/${tags}?random=${seed}`;
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function main() {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const db = JSON.parse(raw);

  if (!Array.isArray(db.recipes)) {
    console.error('No "recipes" array found in database.json');
    process.exit(1);
  }

  console.log('Before sample images:', db.recipes.slice(0, 3).map(r => r.image));

  db.recipes = db.recipes.map((rec, index) => {
    // chọn keyword theo index để phân bố đều, hoặc random
    const keyword = foodKeywords[index % foodKeywords.length];
    const seed = index + 1; // đảm bảo khác nhau
    const newImage = USE_LOREMFLICKR ? makeLoremFlickrUrl(keyword, seed) : makeUnsplashUrl(keyword, seed);
    return {
      ...rec,
      image: newImage
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf-8');

  console.log('After sample images:', db.recipes.slice(0, 3).map(r => r.image));
  console.log(`✅ Done! Updated ${db.recipes.length} recipe.image to random food images.`);
  console.log('Tip: open one of the image URLs in browser to verify.');
}

main();
