# Travel Survey Form Application

A React-based web application for generating survey forms for tourists and general travelers. The application collects user interests, personal information, travel behavior, motivation, and decision-making factors, then generates SQL statements for database insertion.

---

## Features

- **Dynamic Survey Forms**: Multi-part survey including interests, personal info, travel behavior, motivation, and decision-making.
- **Interactive Inputs**:
  - Checkboxes for multiple-choice questions.
  - Radio buttons for single-choice selections.
  - Conditional text fields for "Other" options.
- **Fake Data Generation**: Uses [`@faker-js/faker`](https://github.com/faker-js/faker) to generate realistic user data.
- **SQL Generation**: Converts form responses into SQL `INSERT` statements for database use.
- **Copy to Clipboard**: Easily copy generated SQL queries.
- **Validation**: Checks for incomplete survey fields before submission.

---

## Tech Stack

- **React**: Frontend library
- **Material-UI (MUI)**: UI components for styling and layout
- **Faker.js**: Fake data generation
- **JavaScript / JSX**: Core language
- **CSS**: Styling
