from flask import Flask
from config import Config
from app.extensions import db, migrate


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():

        from app.main.routes import main

        app.register_blueprint(main)

        from app.models import Todo

        @app.shell_context_processor
        def make_shell_context():
            return {'db': db, 'Todo': Todo}

    return app