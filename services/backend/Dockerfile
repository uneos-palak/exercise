FROM python:3.11-buster

COPY config-files /root/
# Replace `/home/runner` with `/root` if present in ssh config
RUN sed 's|/home/runner|/root|g' -i.bak /root/.ssh/config || true
RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . /app
RUN --mount=type=ssh,required=true python -m pip install -e .

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

EXPOSE 8050

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# From VS Code excers:
# CMD ["gunicorn", "--bind", "0.0.0.0:8050", "-k", "uvicorn.workers.UvicornWorker", "excers.__main__:app"]
CMD uvicorn excers.__main__:app --host 0.0.0.0 --port 8050
