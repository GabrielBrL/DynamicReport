FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY ["DynamicReport.Api/DynamicReport.Api.csproj", "DynamicReport.Api/"]
COPY ["DynamicReport.Shared/DynamicReport.Shared.csproj", "DynamicReport.Shared/"]

RUN dotnet restore "DynamicReport.Api/DynamicReport.Api.csproj" 

COPY . .
WORKDIR "/app/DynamicReport.Api"
RUN dotnet build "DynamicReport.Api.csproj" -c Release -o /app/build

FROM build-env AS publish
RUN dotnet publish "DynamicReport.Api.csproj" -c Release -o /app/publish
 

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app 
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DynamicReport.Api.dll"]