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

## **Important Configuration Files in Angular**

### **1. `package.json`**
Here's a detailed explanation of dependencies in **package.json**, including **peerDependencies**, **dependencies**, and **devDependencies**, along with their use cases and comparisons. I'll also include Markdown format to integrate into your Angular documentation.

The `package.json` file is the heart of any Node.js project, including Angular applications. It defines the metadata of your project and manages its dependencies, which are essential libraries or tools your project needs to run, develop, or build.


#### 1. **Dependencies**
   - **Definition:** These are libraries that your project requires at runtime. When you build or run your application, these packages are bundled into the final output.
   - **Example Use Case:** Core Angular packages like `@angular/core` or utility libraries like `lodash`.
   - **Example:**
     ```json
     "dependencies": {
       "@angular/core": "^16.0.0",
       "lodash": "^4.17.21"
     }
     ```
   - **When to Use:** Use for packages that your application directly uses in production.

---

#### 2. **DevDependencies**
   - **Definition:** These are libraries required only during the development phase. They are not bundled with the final application.
   - **Example Use Case:** Testing tools like `Karma`, bundlers like `Webpack`, or TypeScript compilers.
   - **Example:**
     ```json
     "devDependencies": {
       "@angular/cli": "^16.0.0",
       "karma": "^6.4.1",
       "typescript": "^5.1.0"
     }
     ```
   - **When to Use:** Use for tools and libraries that help you build or test the project but are not needed in production.

---

#### 3. **PeerDependencies**
   - **Definition:** Peer dependencies specify libraries that your project needs but are expected to be installed by the end user or parent project, not directly by your package.
   - **Example Use Case:** If you're building an Angular library that relies on a specific version of Angular, you declare it as a peer dependency so the parent application must provide it.
   - **Example:**
     ```json
     "peerDependencies": {
       "@angular/core": "^16.0.0",
       "@angular/common": "^16.0.0"
     }
     ```
   - **When to Use:** Use when you're creating reusable libraries or packages and want to ensure compatibility with a specific version of a library/framework.

---

#### 4. **OptionalDependencies**
   - **Definition:** These are dependencies that are not strictly required. If they fail to install, the project will not break.
   - **Example:**
     ```json
     "optionalDependencies": {
       "fsevents": "^2.3.2"
     }
     ```
   - **When to Use:** Use for optional features or tools that enhance functionality but are not critical.

---

#### **Comparing Dependencies**

| **Type**             | **Installed by Default?** | **Bundled in Production Build?** | **Purpose**                                                                                 |
|-----------------------|---------------------------|-----------------------------------|---------------------------------------------------------------------------------------------|
| `dependencies`        | Yes                       | Yes                               | Required at runtime for the application to work.                                            |
| `devDependencies`     | No                        | No                                | Required during development or testing but not needed in production.                       |
| `peerDependencies`    | No                        | No                                | Ensures the parent project provides the correct version of a dependency.                   |
| `optionalDependencies`| Yes (if possible)         | Yes (if installed)                | Adds optional features or tools, but failure to install does not break the application.     |

---

#### **Why Peer Dependencies Are Important**
When building reusable libraries, it's essential to prevent version conflicts between dependencies. Peer dependencies ensure:
1. **Compatibility:** The consuming project provides the necessary version of the dependency.
2. **Avoidance of Duplicates:** Only one version of a shared dependency is installed in the parent project.

#### Example:
Suppose you create a library, `my-angular-library`, which uses Angular 16. You declare `@angular/core` as a peer dependency:
```json
"peerDependencies": {
  "@angular/core": "^16.0.0"
}
```

### **2. `angular.json`**
This is the workspace configuration file that controls how the application is built and served.

#### **Key Sections**
- **`projects`:** Defines settings for each project in the workspace.
- **`styles`:** Specifies global stylesheets (e.g., `styles.css`).
- **`scripts`:** Specifies global JavaScript files to include.
- **`fileReplacements`:** Used for environment-specific configurations (e.g., `environment.prod.ts`).

#### **Example:**
```json
"projects": {
  "my-app": {
    "architect": {
      "build": {
        "options": {
          "outputPath": "dist/my-app",
          "styles": [
            "src/styles.css"
          ],
          "scripts": []
        }
      },
      "serve": {
        "options": {
          "port": 4200
        }
      }
    }
  }
}
```

### **3. `tsconfig.json`**
This file configures TypeScript compilation settings.

#### **Key Parameters**
- **`compilerOptions`:** Configures TypeScript behavior.
  - `target`: Specifies the JavaScript version to output (e.g., `es2015`).
  - `module`: Determines the module system used (e.g., `esnext`).
  - `strict`: Enables strict type-checking options.

#### **Example:**
```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "esnext",
    "strict": true,
    "paths": {
      "@app/*": ["src/app/*"]
    }
  }
}
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
