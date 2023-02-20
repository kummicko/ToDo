# Simple ToDo app

Enhanced frontend with responsive grid or list view layout. Also added transition for items when deleting them.  
Project structure is a bit advanced using blueprint and python-dotenv for managing environment variables. Project can be extended in many ways(users to add, categories for tasks, due time for tasks, etc.).

## How to install

- git clone https://github.com/kummicko/ToDo.git
- from terminal: cd ToDo
- create virtual environment
- activate it
- create .env file in the project root and add this to it

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