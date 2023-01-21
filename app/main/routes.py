from flask import Blueprint, redirect, render_template, request, url_for
from app.models import Todo
from app.extensions import db

main = Blueprint('main', __name__)

@main.get('/')
def index():
    tasks = Todo.query.all()
    return render_template('index.html', tasks=tasks)


@main.post('/add')
def add():
    json_data = request.get_json()
    newTask = Todo(task=json_data.get('task'))
    db.session.add(newTask)
    db.session.commit()
    return json_data