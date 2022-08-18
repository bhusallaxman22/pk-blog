# BlogApp

This is a Blog App I made with Express and ejs as a rendering engine.
I've used MongoDB. This is a app I made to Learn RESTFUL Routes.

## RESTFUL Routes:

| Name    | Path            | HTTP Verb |
| ------- | --------------- | --------- |
| Index   | /blogs          | GET       |
| New     | /blogs/new      | GET       |
| Create  | /blogs          | POST      |
| Show    | /blogs/:id      | GET       |
| Edit    | /blogs/:id/edit | GET       |
| Update  | /blogs/:id      | PUT       |
| Destroy | /blogs/:id      | POST      |

# Dependencies and Conventions
I've used Semantic Ui and react for front end with React Testing Library.
For Backend I've used node with expressjs and MongoDB as database.
## TODOS.

- [x] Add, delete and Edit blogs,
- [x] Add Authentication,
- [x] Only Authenticated and selected user can Add, Edit and Update Blogs
- [ ] Add Admin Dashboard
- [ ] Add Profile Page and user's Dashboard

### Installation

You need to have Node and npm installed to reun the project.

Clone this repo.

run `npm install`.

run `nodemon app`.
