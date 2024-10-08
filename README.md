﻿## Task Overview

1. **User Interface Implementation**

   - Create the user interface based on the provided design.

2. **Search Functionality**

   - Include a search bar to filter the user list by celebrity name.

3. **Accordion Behavior**

   - Implement user list items as accordions:
     - Clicking an accordion should collapse all other accordions and enlarge the clicked one.
     - Clicking the same accordion again should collapse it.
     - Manage the "+" and "-" icons to reflect the accordion state (collapsed = "-", open = "+").

4. **Data Handling**

   - Fetch data from the provided JSON file to populate the user list. (Note: Editing the JSON file is not allowed.)
     - Calculate the user's age based on their date of birth.
     - Gender should be a dropdown with the following options: Male, Female, Transgender, Rather not say, Other.
     - Country should be a text field.
     - Description should be a text area.

5. **Edit and Delete Functionality**

   - **Edit Mode:**
     - Allow editing of user details directly in the interface.
     - Editing is permitted only for users classified as adults.
     - Implement validations to prevent:
       - Text input in the age field.
       - Numeric input in the nationality field.
       - Empty fields.
     - Provide save and cancel options:
       - The save button is disabled by default and becomes active only if details are changed.
       - Clicking save updates the user's details.
       - Clicking cancel reverts details to their last known state.
       - Opening another accordion is restricted while in edit mode.

   - **Delete Mode:**
     - Prompt a confirmation alert before deleting a user:
       - If confirmed, delete the user.
       - If canceled, no action is taken.

## Design Reference
![Assessment Design](https://github.com/user-attachments/assets/8e80c2c1-ce9f-4c71-85b4-94adad58a0c1)

