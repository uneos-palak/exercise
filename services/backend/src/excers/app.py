import logging
import os
from contextlib import asynccontextmanager
from importlib.metadata import metadata
from typing import Any

import meflag
import melogs
from fastapi import FastAPI, status
from fastapi.exception_handlers import http_exception_handler
from fastapi.middleware.cors import CORSMiddleware
from meauth.router import router as auth_router
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.sessions import SessionMiddleware

from . import __version__

logger: logging.Logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    meflag.register_new_feature_flags()
    yield


def configure_app(with_lifespan: bool) -> FastAPI:
    melogs.configure_root_logger_with_ecs()
    about_this = metadata("excers")

    app = FastAPI(
        title=about_this["Name"],
        description=about_this["summary"],
        version=__version__,
        contact={
            "name": about_this["Author"],
            "email": about_this["Author-Email"],
        },
        lifespan=(lifespan if with_lifespan else None),
    )

    @app.exception_handler(StarletteHTTPException)
    async def logging_http_exception_handler(  # type: ignore
        request: Any, exc: StarletteHTTPException
    ):
        if exc.status_code == status.HTTP_401_UNAUTHORIZED:
            logger.info(f"HTTP Error {exc.status_code}: {exc.detail}")
        else:
            logger.error(f"HTTP Error {exc.status_code}: {exc.detail}")
        return await http_exception_handler(request, exc)

    app.include_router(auth_router)

    origins = [
        "http://localhost:8130",
        "http://localhost:8050",
        "https://auth-dev.uneos.io",
    ]
    if os.getenv("FRONTEND_ORIGIN"):
        origins.append(str(os.getenv("FRONTEND_ORIGIN")))

    app.add_middleware(
        SessionMiddleware,
        secret_key=os.getenv("SESSION_SECRET_KEY"),
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    melogs.add_fastapi_middleware(app, "excers-be")

    @app.get("/")
    def home():  # type: ignore
        return "Der Service läuft."

    return app
