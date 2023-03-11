# Explanation about the Ticket Breakdown

## Time/Effort
- Based in the Fibonacci points and for each thinking that one developer per storie will work.

## Stories
---
### Main Goal:
- Ensure that Agent domain start to use just the customId instead of the database generated id. Keep Shifts, Facilities and report service functionalities without breaking changes and using the customId.

#### 1. Update Agent data model to add customId
  - Update domain to add customId as string value
  - CustomId should be an string not nullable
  - For each existing Agent record should insert an customId based in UUID v4
  - EFFORT: (3)
#### 2. Update Agent service to store customId
  - Should validate if already exists a customId with provided value and return an error to user to type another value
  - Should validate that customId cant be empty
  - EFFORT: (2)
#### 3. Update "getShiftsByFacility" service to fetch Agents by customId
  - Update query to fetch Agents by customId instead of the database id
  - EFFORT: (2)
#### 4. Update "generateReport" service to use Agents customId
  - Ensure when the report is generated the id related with the user is the "customId" instead of the id from the generated from database.
  - EFFORT: (2)