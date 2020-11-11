import os
# dependencies for service injection
from injector import Binder
from flask_injector import FlaskInjector
from services.warehouse_service import ItemsProvider
# dependencies for service launching
from connexion.resolver import RestyResolver
import connexion
import settings
from flask_cors import CORS

def configure_services(binder: Binder) -> Binder:
    binder.bind(ItemsProvider, to=ItemsProvider([{"Name":"Test 1"},{"Name":"Test 2"},{"Name":"Test 3"},{"Name":"Test 4"},{"Name":"Test 5"}]))
    return binder
def configure_app(flask_app):
    flask_app.config['SERVER_PORT'] = settings.FLASK_SERVER_PORT
    # flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP
    flask_app.config['DEBUG'] = settings.FLASK_DEBUG

if __name__ == '__main__':
    app = connexion.App(__name__,  specification_dir='swagger/')
    flask_app = app.app
    CORS(flask_app)
    configure_app(flask_app)
    web_port = int(os.environ.get('PORT', settings.FLASK_SERVER_PORT))
    app.add_api('mainapp.yaml', resolver=RestyResolver('api'))
    FlaskInjector(app=flask_app, modules=[configure_services])
    app.run(port=web_port, host='0.0.0.0')
