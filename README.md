# Notes App

## API

| Type          | Route          | Description |
| ------------- | -------------  | ------------- |
| POST          | /notes/create  | Creates new note given { Name: username, Title: usertitle, Content: usercontent, Date: userdate }  |
| DELETE        | /notes/delete  | Deletes an existing note given: { Name: username, _id: nid } |
| PATCH         | /notes/update  | Updates an existing note given: { Name: username, _id: nid, whatever: whatever  } |
| GET           | /notes/:uid    | returns all of the users notes data given query param uid |
| POST          | /auth/register | Creates a new user given { Name: username, email: email, password: password } |
| POST          | /auth/login    | Logs user in given { email: email, password: password } |
| POST          | /auth/logout   | Terminates a user session given { email: email, password: password } |
| POST          | /auth/validate | Validates a user session given { SESSION_TOKEN: SESSION_TOKEN } |