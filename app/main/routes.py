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
    db.session.flush()
    print(newTask.id)
    db.session.commit()
    return {'id' : newTask.id, 'timestamp': newTask.timestamp.strftime('%d.%m.%Y - %H:%M')}


@main.put('/mark_done')
def mark_done():
    json_data = request.get_json()
    markedTask = Todo.query.get_or_404(json_data.get('id'))
    markedTask.complete = True
    db.session.commit()
    return json_data

@main.put('/update_text')
def update_text():
    json_data = request.get_json()
    taskToUpdate = Todo.query.get_or_404(json_data.get('id'))
    taskToUpdate.task = json_data.get('task')
    db.session.commit()
    return json_data


@main.delete('/delete')
def delete():
    json_data = request.get_json()
    taskToDelete = Todo.query.get_or_404(json_data.get('id'))
    db.session.delete(taskToDelete)
    db.session.commit()
    return json_data