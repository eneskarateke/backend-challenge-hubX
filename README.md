# Port = 9000,

## npm install

to download dependencies.

## npm run server

to start server with nodemon.

## npm start

to start server with node.

## npm run resetdb

to reset to default database.

## npm run test

to start testing.

AUTHOR API

GET LIST OF AUTHORS
http://localhost:9000/api/author/

GET AN AUTHOR BY ID
http://localhost:9000/api/author/:id

POST(ADD) AN AUTHOR
http://localhost:9000/api/author/

{
"name":"Dostoyevski",
"country": "Türkiye",
"birthdate": "1998-12-08"

}

PUT(UPDATE) AN AUTHOR
http://localhost:9000/api/author/:id

{
"name":"Enes Hamza Karateke",
"country": "Türkiye",
"birthdate": "1998-12-08"

}

DELETE AN AUTHOR BY ID
http://localhost:9000/api/author/:id

BOOK API

GET LIST OF BOOKS
http://localhost:9000/api/book

GET A BOOK BY ID
http://localhost:9000/api/book/:id

POST(ADD) A BOOK
http://localhost:9000/api/book/

{ "title": "Suç ve Ceza ",
"price": 19.99,
"num_pages": 300,
"publisher": "Sample Publisher",
"author_id": 1,
"isbn": "9999-999-9999",
"language": "English"

}

PUT(UPDATE) A BOOK
http://localhost:9000/api/book/:id

{ "title": "Suç ve Ceza ",
"price": 19.99,
"num_pages": 300,
"publisher": "Sample Publisher",
"author_id": 1,
"isbn": "9999-999-9999",
"language": "English"

}

DELETE A BOOK BY ID
http://localhost:9000/api/book/:id
