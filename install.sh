#!/bin/bash

# Catch errors
set -e
function on_exit {
  # $? is the exit status of the last command executed
  local exit_status=$?
  if [ $exit_status -ne 0 ]; then
    echo "❌ Something went wrong, exiting: $exit_status"
  fi
}
trap on_exit EXIT

echo "🔧 Checking dependencies..."
if ! command -v docker &>/dev/null; then
  echo "  ❌ Docker is not installed or not in PATH. Please install Docker first."
  exit 1
fi
if ! command -v curl &>/dev/null; then
  echo "  ❌ Curl is not installed or not in PATH. Please install Curl first."
  exit 1
fi

# Use environment variables VERSION and BRANCH, with defaults if not set
version=${VERSION:-$(curl -s https://api.github.com/repos/twentyhq/twenty/releases/latest | grep '"tag_name":' | cut -d '"' -f 4)}
branch=${BRANCH:-main}

echo "🚀 Using version $version and branch $branch"

dir_name="twenty"

while [ -d "$dir_name" ]; do
  read -p "Directory '$dir_name' already exists. Please enter a new directory name: " user_input
  dir_name=$user_input
done

# Create a directory named twenty
echo "📁 Creating directory '$dir_name'"
mkdir -p "$dir_name" && cd "$dir_name" || { echo "❌ Failed to create/access directory '$dir_name'"; exit 1; }

# Copy the twenty/packages/twenty-docker/prod/docker-compose.yml file in it
echo "  📄 Copying docker-compose.yml"
curl -sLo docker-compose.yml https://raw.githubusercontent.com/twentyhq/twenty/$branch/packages/twenty-docker/prod/docker-compose.yml

# Copy twenty/packages/twenty-docker/prod/.env.example to .env
echo "  🔧 Setting up .env file"
curl -sLo .env https://raw.githubusercontent.com/twentyhq/twenty/$branch/packages/twenty-docker/prod/.env.example

# Replace TAG=latest by TAG=<latest_release or version input>
if [[ $(uname) == "Darwin" ]]; then
  # Running on macOS
  sed -i '' "s/TAG=latest/TAG=$version/g" .env
else
  # Assuming Linux
  sed -i'' "s/TAG=latest/TAG=$version/g" .env
fi

# Generate random strings for secrets
echo "ACCESS_TOKEN_SECRET=$(openssl rand -base64 32)" >>.env
echo "LOGIN_TOKEN_SECRET=$(openssl rand -base64 32)" >>.env
echo "REFRESH_TOKEN_SECRET=$(openssl rand -base64 32)" >>.env
echo "FILE_TOKEN_SECRET=$(openssl rand -base64 32)" >>.env

echo "  ✨ .env configuration completed"

# Ask user if he wants to start the project
read -p "🚀 Do you want to start the project now? (Y/n) " answer
if [ "$answer" = "n" ]; then
  echo "✅ Project setup completed. Run 'docker-compose up -d' to start."
  exit 0
else
  echo "  🐳 Starting Docker containers..."
  docker compose up -d
  echo "  🐳 Project started!"
fi

function ask_open_browser {
  read -p "🌐 Do you want to open the project in your browser? (Y/n) " answer
  if [ "$answer" = "n" ]; then
    echo "✅ Setup completed. Access your project at http://localhost:3000"
    exit 0
  fi
}

# Ask user if he wants to open the project
# Running on macOS
if [[ $(uname) == "Darwin" ]]; then
  ask_open_browser

  open "http://localhost:3000"
# Assuming Linux
else
  # xdg-open is not installed, we could be running in a non gui environment
  if command -v xdg-open >/dev/null 2>&1; then
    ask_open_browser

    xdg-open "http://localhost:3000"
  else
    echo "✅ Setup completed. Your project is available at http://localhost:3000"
  fi
fi
