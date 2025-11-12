# Plated App

GitHub link: https://github.com/Ndumi7/Chef.git 
YouTube link: https://youtu.be/n-xD0TGDqmI 

**Plated** is a mobile app that lets Chef Christoffel create and manage a personalized menu for guests. Guests can view the menu, filter dishes by course, and see average prices for starters, mains, and desserts.

---

## Features

- Add, edit, and remove dishes from the menu
- View all added dishes
- Filter dishes by course (Starter, Main, Dessert)
- Display average price of dishes per course on the home screen
- User-friendly interface with dark theme

---

## Screens

1. **HomePage**
   - Shows app title, subtitle, description
   - Shows average price for each course
   - Buttons to start and view menu

2. **MenuList**
   - Add new dishes with name, description, course, and price
   - Edit existing dishes
   - View added dishes
   - Navigate back to Home

3. **MenuDisplay**
   - Shows all added dishes in a card layout
   - Edit or remove any dish
   - Navigate to add new dishes

4. **FilterMenu**
   - Filter dishes by course
   - Shows only dishes of selected course

---

## Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/Ndumi7/Chef.git
Install dependencies:

bash
Copy code
npm install
Run the app (for Expo):

bash
Copy code
npm start

---


## Changelog
Part 2

Implemented basic app with HomePage, MenuList, MenuDisplay

Added dish management (add, edit, remove)

Fixed button colors and spacing

Added navigation between screens

Part 3

Added FilterMenu screen to filter dishes by course

Added average price per course calculation on HomePage

Added buttons to navigate to FilterMenu from HomePage and MenuList

Refactored MenuDisplay and MenuList to correctly pass setMenuItems for removal

Updated navigation to always go back to HomePage

Improved code structure and readability

References
W3Schools (2025) React Native Tutorial. Available at: https://www.w3schools.com/react/react_native_intro.asp (Accessed: 12 November 2025).

React Native Documentation (2025) Components and APIs. Available at: https://reactnative.dev/docs/components-and-apis (Accessed: 12 November 2025).

Stack Overflow (2025) React Native Navigation Issues. Available at: https://stackoverflow.com/questions/tagged/react-native (Accessed: 12 November 2025).

React Navigation (2025) React Navigation Docs. Available at: https://reactnavigation.org/docs/getting-started (Accessed: 12 November 2025).
