# Swagger Keycloak

## Overview

Swagger documentation is a powerful tool for specifying APIs, but challenges arise when dealing with both internal and externally exposed APIs. Sharing Swagger documentation publicly can be tricky, and managing separate documentation for each type of API can be cumbersome.

This project addresses these challenges by introducing authentication and authorization to Swagger. This eliminates the need for separate documentation for each API. By defining roles, it becomes possible to control access to and viewing of the API based on user roles. This approach simplifies the management of internal and external APIs within a single project, enhancing both accessibility and security.

## Roadmap

### 1. User Authentication
- [x] Implemented user authentication for enhanced security.

### 2. Authorization
- [ ] Add authorization features to control user access.
- [ ] Implement role-based access control for different user privileges.

### 3. Swagger Diff Feature
- [ ] Integrate Swagger Diff functionality.
- [ ] Enable users to view API history and detailed change logs.

## Getting Started

To get started with the project, follow these steps:

```bash
cd docs/keycloak
docker-compose up -d
# Or use `docker compose up -d` depending on your Docker version

cd ../../
npm install
npm start
```

## Contribution Guidelines

Explain how others can contribute to your project and any guidelines they should follow.

## Acknowledgements

Give credit to any resources or contributors that helped in the development of your project.
