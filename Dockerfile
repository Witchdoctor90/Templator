FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7111
EXPOSE 5140

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["Templator.sln", "./"]
COPY ["Templator.WebApi/Templator.WebApi.csproj", "Templator.WebApi/"]
COPY ["Templator.Application/Templator.Application.csproj", "Templator.Application/"]
COPY ["Templator.Domain/Templator.Domain.csproj", "Templator.Domain/"]
COPY ["Templator.Infrastructure/Templator.Infrastructure.csproj", "Templator.Infrastructure/"]

RUN dotnet restore "Templator.sln"

COPY . .

RUN dotnet build "Templator.sln" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release

RUN dotnet publish "Templator.WebApi/Templator.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Templator.WebApi.dll"]
