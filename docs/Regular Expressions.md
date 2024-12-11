### **What Are Regular Expressions?**
A **regular expression** is a sequence of characters that forms a search pattern. It allows you to:
1. **Find substrings** in a text (e.g., extract phone numbers or emails).
2. **Replace parts** of a string (e.g., format a number or mask sensitive data).
3. **Validate input** (e.g., check if a string is a valid email).

---

### **Key Concepts in Regex**

#### **1. Special Characters**
- **`.`**: Matches any single character except a newline.
- **`^`**: Matches the start of a string.
- **`$`**: Matches the end of a string.
- **`\d`**: Matches any digit (0-9).
- **`\w`**: Matches any word character (letters, digits, underscores).
- **`\s`**: Matches any whitespace (spaces, tabs, line breaks).
- **`\b`**: Matches a word boundary.
- **`\B`**: Matches where there's no word boundary.

---

#### **2. Quantifiers**
Quantifiers specify how many times a pattern can occur:
- **`*`**: Matches 0 or more occurrences.
- **`+`**: Matches 1 or more occurrences.
- **`?`**: Matches 0 or 1 occurrence.
- **`{n}`**: Matches exactly `n` occurrences.
- **`{n,}`**: Matches `n` or more occurrences.
- **`{n,m}`**: Matches between `n` and `m` occurrences.

---

#### **3. Groups and Ranges**
- **`[]`**: Matches any character inside the brackets.  
  Example: `[aeiou]` matches any vowel.
- **`[^...]`**: Matches any character **not** in the brackets.  
  Example: `[^aeiou]` matches any consonant.
- **`(...)`**: Groups patterns for operations like repetition or capturing.  
  Example: `(abc)+` matches `abc`, `abcabc`, etc.

---

#### **4. Anchors and Lookarounds**
- **Anchors**:
  - **`^`**: Ensures the match is at the start of a string.
  - **`$`**: Ensures the match is at the end of a string.
- **Lookarounds**:
  - **Positive Lookahead** (`(?=...)`): Ensures a pattern **ahead** matches without consuming characters.
  - **Negative Lookahead** (`(?!...)`): Ensures a pattern **ahead** does not match.
  - **Positive Lookbehind** (`(?<=...)`): Ensures a pattern **behind** matches.
  - **Negative Lookbehind** (`(?<!...)`): Ensures a pattern **behind** does not match.

---

### **How to Write and Test Regex**

#### **1. Writing Regex**
Start small and break the problem into steps:
1. Identify the pattern you want to match (e.g., digits, words, special characters).
2. Use special characters or quantifiers to express repetition or optionality.
3. Test each part of your regex as you build it.

#### **2. Testing Regex**
Tools like regex testers make it easy to debug and refine your expressions:
- [regex101](https://regex101.com)
- [RegExr](https://regexr.com)

---

### **Examples**

#### **Task 1: Validate an Email**
Regex: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

Explanation:
- `^`: Start of the string.
- `[a-zA-Z0-9._%+-]+`: Matches the username (alphanumeric + special characters).
- `@`: Matches the `@` symbol.
- `[a-zA-Z0-9.-]+`: Matches the domain name.
- `\.`: Matches the dot in `.com`.
- `[a-zA-Z]{2,}$`: Matches the top-level domain (at least 2 characters).

#### **Task 2: Format a Phone Number**
Regex: `(\d{3})-(\d{3})-(\d{4})`

Matches:
- `123-456-7890`
- Captures the groups: Area code, prefix, and line number.

#### **Task 3: Extract Words**
Regex: `\b\w+\b`

Matches:
- Any single word in a sentence.

---

### **Why Learn Regex?**

Regex is a fundamental skill in web development, data parsing, and automation:
- In **Angular**, regex is used for input validation (e.g., forms).
- In **JavaScript**, regex powers `String.prototype.replace` or `match`.
- In **backend systems**, regex helps sanitize or process data efficiently.