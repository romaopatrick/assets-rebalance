# Use official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project file into the container and restore dependencies
COPY assets_rebalance_backend/ ./assets_rebalance_backend/

WORKDIR /app/assets_rebalance_backend
RUN dotnet restore

# Copy the rest of the application files into the container

# Build the application
RUN dotnet publish -c Release -o /app/out

# Use a lightweight runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/out .

# Expose the application port
EXPOSE 8080

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "assets_rebalance_backend.dll"]
