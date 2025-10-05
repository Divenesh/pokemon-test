# 🎨 Frontend Documentation

Welcome to the **Pokédex Frontend**! 🚀
This section explains the technologies used, data fetching flow, key improvements, and how to test the app.

---

## 🛠️ Technologies Involved

1. ⚡ **Next.js** – React framework for fast and scalable frontend development
2. 🎨 **Ant Design** – UI component library for a clean and modern design
3. ✅ **ESLint** – Ensures enterprise-level coding standards

---

## 🔄 Data Fetching

We’ve implemented **two API functions** for fetching Pokémon data:

### 1️⃣ `fetchPokemonData()`

* Purpose: Fetches Pokémon from the backend based on **page** and **limit** (constant = 60).
* API URL:

  ```bash
  http://localhost:8002/api/pokemon?page=${page}&limit=60
  ```

### 2️⃣ `searchPokemon()`

* Purpose: Searches for a specific Pokémon by **name** (from the search bar).
* API URL:

  ```bash
  http://localhost:8002/api/pokemon/search?name=${name}
  ```

📦 **Required Data Returned:**

* `name`
* `image`
* `type`
* `height`
* `weight`

---

## 📂 Important File Structure

* 📡 Data Fetching → `/pokedex/api/PokemonData.ts`
* 🏠 Home Page → `/pokedex/src/app/page.tsx`

---

## 🚀 Key Improvements

1. 📱 Responsive UI for all devices
2. 🔄 Infinite scroll pagination (better performance & smoother UX)
3. 🖼️ Images compressed to **WebP** format for faster loading
4. 🛡️ Added `try/catch` for error handling during API requests
5. 🔑 All API URLs placed in `.env` file for security (`.env` is uploaded in github 🚀)
6. 🎣 Proper usage of **React Hooks**
7. 📝 Defined TypeScript interfaces for structured data
8. 🧹 Clean and refactored codebase


## ⚠️ Disclaimer

No AI was used in building the **frontend code**. All references are from **past projects** and **official documentation**.

---

✨ That’s it! Enjoy catching ‘em all with a smooth, optimized, and well-tested frontend! 🐾🔥
