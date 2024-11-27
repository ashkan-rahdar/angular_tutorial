# **Introduction to Angular**

## **What is Angular?**
Angular is a **TypeScript-based framework** for building dynamic web applications. It is developed and maintained by Google and is widely used for creating modern Single Page Applications (SPAs). 

With Angular, you can:
- Build reusable components.
- Implement powerful data binding.
- Use dependency injection for modular code.
- Develop with the support of a large ecosystem of tools and libraries.

---

## **Why Use Angular?**

### **Single Page Applications (SPA)**
Angular is optimized for building SPAs. A SPA dynamically updates the content of the page without requiring a full-page reload. This improves the user experience by making the application faster and more interactive.

### **Server-Side Rendering (SSR)**
While SPAs are fast and dynamic, they might struggle with:
- **SEO (Search Engine Optimization):** SPAs are often not SEO-friendly because search engines might not index JavaScript-rendered pages.
- **Initial Load Time:** The first page might load slower due to JavaScript rendering.

Angular supports SSR with **Angular Universal**, enabling applications to render HTML on the server before serving it to the browser. This improves:
- SEO performance.
- Faster initial page loading.

In this tutorial, we’ll focus on SPAs initially and introduce SSR later.

---

## **Setting Up Angular Locally**

### **Prerequisites**
Ensure you have the following installed:
1. **Node.js and npm (Node Package Manager):** Angular uses npm to manage dependencies. [Download Node.js](https://nodejs.org/).
2. **Angular CLI:** A command-line interface tool for creating and managing Angular projects.

### **Installing Angular CLI**
Run the following command to install Angular CLI globally:
```bash
npm install -g @angular/cli@17
```

with @17 we are mentioning installtion version 

#### **Using a Batch File for Local Installation**
If you don't want to install Angular CLI globally, you can install it locally and use a batch file to run Angular commands without adding it to the PATH.

1. Install Angular CLI locally:
   ```bash
   npm install @angular/cli@17
   ```

2. Create a batch file:
   - Save the following script as `_ng.bat` in your project root:
     ```batch
     @echo off
     node_modules\.bin\ng %*
     ```
   - Use this batch file to run Angular commands. For example:
     ```bash
     _ng.bat new my-app
     ```
    - you have to put this in your workspace, as you can see in repository  
---
## **Creating an Angular Application**

To create an Angular application, run the following command:
```bash
ng g application <app-name>
```

### **Options Used**
- **Without SSR**: At this stage, we won’t enable server-side rendering. (You can later add SSR with Angular Universal.)
- **CSS**: By default, we’ll use CSS for styling. However, Angular supports other preprocessors:
  - **SCSS (SASS):** For more advanced and modular styling.
  - **LESS:** Another CSS preprocessor.
  - **Stylus:** A minimalist preprocessor.
  - To use these alternatives, specify during project creation:
    ```bash
    ng g application <app-name> --style=scss
    ```

---


## **Running the Application**
After setting up the application, run the following command to start the development server:
```bash
ng serve
```

- The application will be available at [http://localhost:4200](http://localhost:4200).

---

## **Summary**
1. Angular is a powerful framework for SPAs and supports SSR.
2. Use Angular CLI to set up projects quickly.
3. Understand configuration files:
   - **`package.json`:** Manages dependencies and scripts.
   - **`angular.json`:** Configures build and serve options.
   - **`tsconfig.json`:** Configures TypeScript behavior.
4. Start building and exploring Angular components, directives, and modules!
