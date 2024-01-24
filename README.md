# AngularEnvironmentVariables
This repository is part of a blog post you can read here:

The main goal was to provide a more cloud-native usage of environment variables for Angular applications. This is achieved by creating a node application, which reads the environment variables and provides them through a known endpoint and interface, which is hosted on the same URL as the angular application itself. That way, we don't have to define any base URL, which would have to be changed for each environment.

This can also be done without using Nx. However, setup is heavily simplified when using Nx.


## Start the app
To start the development server run `npm run start`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Deploying to Azure
A simple bicep file, which creates the service plan as well as the WebApp is located in `.bicep`.
The Azure Pipeline, which is located in `.azure`, uses Bicep to deploy to an existing resource group.
