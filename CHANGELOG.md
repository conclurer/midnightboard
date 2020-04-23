# Changelog

### [Database](https://hub.docker.com/r/tvsjsdock/midnightboard-db/tags)

---

## Application

<!--- Version of the docker image with hyperlink and date --->
## [v0.0.1](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) (2020-01-13)

<!--- List of implemented features --->
**Implemented features:**
- Project setup

<!--- Version of the docker image with hyperlink and date --->
## [v0.0.2](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) (2020-02-01)

<!--- List of implemented features --->
**Implemented features:**
- Digital notice board
- Editor for creating new notes
- Vue I18n

<!--- Version of the docker image with hyperlink and date --->
## [v0.0.3](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) (2020-02-26)

<!--- List of implemented features --->
**Implemented features:**
- Post & display images on board
- Notice board branding
- Notice board styling
- Language selection
- Login and registration page

<!--- List of fixed bugs --->
**Fixed bugs:**
- No scroll option in editor sidebar

<!--- Version of the docker image with hyperlink and date --->
## [v0.0.4](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) (2020-03-26)

<!--- List of implemented features --->
**Implemented features:**
- PDF upload and display
- Office file upload and display
- Create, display & submit interactive polls
- CMS page
- Login and registration page
- Language selection dropdown

<!--- List of fixed bugs --->
**Fixed bugs:**
- Fixed bullet points not being displayed in notes
- Fixed date picker transparency
- Added missing translations
- Increased file upload limit
---

<!--- Version of the docker image with hyperlink and date --->
## [v0.0.5](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) (2020-04-22)

<!--- List of implemented features --->
**Implemented features:**
- User role can be set in the CMS
- Users can be created & deleted in the CMS
- Boards & users are listed in the CMS
- Boards can be created & deleted in the CMS
- Users can be created & deleted in the CMS
- Listed boards & users have a context menu for these changes (right click)
- Boards can be set to be public visible
- Boards can be set to be private (visible only for logged in users)
- One board can be set as default board (public visible by default)
- Default board is the new landing page
- The first board that gets created becomes automatically the default board
- When creating another default board, the previous default board will become a regular public board
- Create, display & submit interactive surveys
- Register page now directs to login after registration
- Separate editors for each content type (drop-down menu)
- Each editor has a header with title and date picker
- Editors can be closed via "x" button
- Profile pages with user avatar (circle with initials)
- Avatar icon on the header to view and edit the user profile and option to log out
- Administrators (Super-Users) have in addition the option to open the CMS via avatar icon
- Background color is now applied globally instead of in each view (config folder)
- Vue routing
- Autocomplete fields for register, login and profile pages
- Username and email address can be used to login
- Board sidebar (click on the logo)
- Switch between different boards (categorized by board type) via board sidebar
- Only accessable boards are visible on the board sidebar
- Board sidebar can be used open the login page
- Each note has now a footer
- Note footer shows the due date and a delete button
- Confirm or refuse dialog for note deletion
- Notice boards can be un-/subscribed (except default board) via bell icon next to board title
- Users who have subscribed a notice board are informed about new posts via email
- Consistent layout & full input validation
- Mixins for API calls & navigation guards
- Configurable scheme & authority for the API (config folder)

<!--- List of fixed bugs --->
**Fixed bugs:**
- Header component now work on smaller screens
- HTTP status codes
- Users could vote multiple times for polls
- Due dates from editor's data pickers are used
- Some translations
---