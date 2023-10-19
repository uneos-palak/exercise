# Welcome to Tilt!
# Extensions are open-source, pre-packaged functions that extend Tilt
# More info: https://github.com/tilt-dev/tilt-extensions

analytics_settings(enable=False)
update_settings(k8s_upsert_timeout_secs=60)
load("ext://helm_resource", "helm_resource", "helm_repo")

redis_pw = "local-redis-pwd"
db_pass = "db_pass=local-db-pwd"
auth_password = "auth.password={}".format(redis_pw)
redis_pass = "redis_pass={}".format(redis_pw)
unleash_pass = "unleash_pass=local-unleash-pwd"
backend_pass = "backend_pass=local-backend-pwd"

# Deploy other helm charts
helm_repo("repo_dapr","https://dapr.github.io/helm-charts",labels="dapr")
helm_repo("repo_bitnami","https://charts.bitnami.com/bitnami",labels="dapr")
helm_resource("dapr","repo_dapr/dapr",labels="dapr")
helm_resource(
"dapr-dashboard",
"repo_dapr/dapr-dashboard",
labels="dapr",
port_forwards=["9000:8080"]
)
helm_resource("redis",
"repo_bitnami/redis",
labels="dapr",
flags=["--set","architecture=standalone,auth.enabled=true,{}".format(auth_password)]
)


helm_resource(
"secomm",
"oci://ghcr.io/uneos/secomm",
flags=["--set",redis_pass],
labels="infrastructure"
)
helm_resource(
"sepost",
"oci://ghcr.io/uneos/sepost",
flags=["--set", db_pass],
port_forwards=["5432:5432"],
labels="infrastructure",
)
helm_resource(
"meflag",
"oci://ghcr.io/uneos/meflag",
flags=["--set", ",".join([db_pass, unleash_pass])],
port_forwards=["4242:4242"],
labels="infrastructure",
)

# Building images for the current repo
docker_build(
"ghcr.io/uneos/excers-be",
context="./services/backend",
dockerfile="./services/backend/Dockerfile.dev",
live_update=[sync("./services/backend", "/app")],
ssh="default",
)

docker_build(
"ghcr.io/uneos/excers-fe",
context="./services/frontend",
dockerfile="./services/frontend/Dockerfile.dev",
live_update=[sync("./services/frontend", "/app")],
secret="id=npm_auth,src=/home/vscode/.npmrc",
)

# Deploy charts for the current repo
helm_resource(
"excers-be",
"./services/backend/chart",
image_deps=["ghcr.io/uneos/excers-be"],
image_keys=[("image.repository","image.tag")],
flags=["--set", ",".join([db_pass, backend_pass])],
port_forwards=["8050:8050", "5678:5678"],
labels="excercise1",
)
k8s_resource(
"excers-be",
links=[link("http://localhost:8050/docs", "Docs"),
link("http://localhost:8050/login", "Login")],
)

helm_resource(
"excers-fe",
"./services/frontend/chart",
image_deps=["ghcr.io/uneos/excers-fe"],
image_keys=[("image.repository","image.tag")],
port_forwards=["8130:8130"],
labels="excercise1",
)
k8s_resource(
workload="excers-fe",
links=[link("http://localhost:8130", "App")],
)
