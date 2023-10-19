import json
import logging
import pathlib
from typing import Literal

import click
import yaml

from .app import configure_app

logger: logging.Logger = logging.getLogger(__name__)


@click.command
@click.option(
    "-f",
    "--format",
    type=click.Choice(["json", "yaml"], case_sensitive=False),
    default="yaml",
)
@click.option(
    "-o",
    "--output",
    type=click.Path(dir_okay=False, writable=True, path_type=pathlib.Path),
)
def generate_openapi_schema(
    format: Literal["json", "yaml"], output: pathlib.Path | None
):
    app = configure_app(with_lifespan=False)
    api_as_dict = app.openapi()

    # Convert
    if format == "json":
        api_as_text: str = json.dumps(api_as_dict, indent=2)
    elif format == "yaml":
        api_as_text = yaml.dump(api_as_dict)

    if output is None:
        logger.debug(api_as_text)
    else:
        output.write_text(api_as_text)
