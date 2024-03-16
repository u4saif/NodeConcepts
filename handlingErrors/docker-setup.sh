echo "Building the Project wait.."
docker build -t errorhandling .
echo "Executing the Project Dockerfile"
docker run -p 4000:3000 errorhandling