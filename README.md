# Simple ToDo app

Enhanced frontend with responsive grid or list view layout. Also added transition for items when deleting them.  
Project structure is a bit advanced using blueprint and python-dotenv for managing environment variables. Project can be extended in many ways(users to add, categories for tasks, due time for tasks, etc.). Javascript async fetch is used to send data to avoid refresh page. Also creating and deleting items is done with pure javascript. Although simple application lot of concepts are covered.

![Screenshot from 2023-02-20 19-46-12](https://user-images.githubusercontent.com/80746386/220180642-7568590e-b0d1-4ac8-af26-b78fb8c72f02.png)
![Screenshot from 2023-02-20 19-46-27](https://user-images.githubusercontent.com/80746386/220180663-9d2de53a-9f26-46ab-9e37-db8215084861.png)

## How to install

- git clone https://github.com/kummicko/ToDo.git
- from terminal: cd ToDo
- create virtual environment
- activate it
- create .env file in the project root and add these lines of code to it

```sh
FLASK_APP=todo.py  
FLASK_DEBUG=1   
SECRET_KEY='*******************************'
SQLALCHEMY_DATABASE_URI="sqlite:///tododb"
```
Populate SECRET_KEY with random letters, numbers and special characters.
If you preffer other database change SQLALCHEMY_DATABASE_URI accordingly. Sqlite is simple but adequate in this case.

- pip install -r requirements.txt
- from terminal: flask shell
- \>>>db.create_all()

If you intend to modify database run from terminal:  
flask db init \# to create migrations folder

And after model modification run:

flask db migrate \# track modifications   
flask db upgrade \# affect database

Finnaly:
- flask run 
