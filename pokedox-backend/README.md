# ⚡ Backend Documentation

Welcome to the **Pokédex Backend**! 🚀
This section explains the technologies used, data fetching flow, key improvements, and how to test the API.

---

## 🛠️ Technologies Involved

1. 🐘 **Laravel** – PHP framework for backend development
2. 🌐 **PokéAPI** – External API used to fetch Pokémon data
3. 🔑 **.env Configuration** – Stores API URLs and secrets securely

---

## 🔄 Data Fetching

We’ve implemented **two endpoints** for fetching Pokémon data:

### 1️⃣ `index()`

* Purpose: Fetches Pokémon from the external API based on **page** and **limit** (default = 24, max = 100).
* API URL:

  ```bash
  https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}
  ```

📦 **Required Data Returned:**

* `name`
* `image`
* `types`
* `height`
* `weight`

---

### 2️⃣ `search()`

* Purpose: Searches for a specific Pokémon by **name**.
* API URL:

  ```bash
  https://pokeapi.co/api/v2/pokemon/${name}
  ```

📦 **Required Data Returned:**

* `name`
* `image`
* `types`
* `height`
* `weight`

---

## 📂 Important File Structure

* 📡 API Data Fetching → `/pokedox-backend/app/Http/Controllers/PokemonController.php`
* 📜 Routes → `/pokedox-backend/routes/api.php`
* 🔑 Environment Config → `/pokedox-backend/.env`

---

## 🚀 Key Improvements

1. 🛡️ Added `try/catch` for error handling during API requests
2. 🔑 All API URLs placed in `.env` file for security (`.env` is uploaded in github 🚀)
3. 🧹 Clean and refactored codebase for maintainability

---

## ⚠️ Disclaimer

When initializing **Laravel**, it came with default frontend files.
To simplify, I cleaned them up with the help of **GitHub Copilot** and made the setup **minimalistic**.

---

✨ That’s it! Your backend is now clean, secure, and optimized to power the Pokédex frontend. 🐾🔥
