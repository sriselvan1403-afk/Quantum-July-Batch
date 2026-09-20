## Quantum - Playwright Automation Framework (TypeScript)

This project is a **Playwright automation framework built using TypeScript**, following the **Page Object Model (POM)** design pattern for better readability, reusability, and maintenance.

---

## 📁 Project Structure

```text
quantum
 ┣ constants
 ┃ ┣ appConstants.ts
 ┃ ┗ urlConstants.ts
 ┣ customFixtures
 ┃ ┗ crmFixtures.ts
 ┣ pages
 ┃ ┗ *.ts
 ┣ tests
 ┃ ┗ *.spec.ts
 ┣ playwright.config.ts
 ┣ package.json
 ┗ README.md
```

---

## 📌 Folder Details

### 🔹 `pages/`

* Contains all **Page Object classes**
* Each page represents one application screen
* All locators and page actions are maintained here
* Helps avoid duplication and keeps tests clean

👉 **Page Object Model (POM)** is followed strictly

---

### 🔹 `tests/`

* Contains Playwright test files (`*.spec.ts`)
* Tests use page objects instead of directly interacting with locators

---

### 🔹 `constants/`

* Central place for static values
* `appConstants.ts` – application related constants
* `urlConstants.ts` – environment URLs

---

### 🔹 `customFixtures/`

* Custom Playwright fixtures
* Used for reusable setup like login, shared pages, or test context

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test

```bash
npx playwright test tests/example.spec.ts
```

---

## 📊 Test Reports

### Open Playwright HTML report

```bash
npx playwright show-report
```

---

## 🛠 Tech Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **Page Object Model**
* **Custom Fixtures**

---

## ✅ Best Practices Followed

* Page Object Model (POM)
* Reusable custom fixtures
* Centralized constants
* Clean and maintainable test code

