
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /server


COPY ["WebshopProject/WebshopProject.csproj", "WebshopProject/"]
RUN dotnet restore "WebshopProject/WebshopProject.csproj"


COPY . . 
WORKDIR "/server/WebshopProject"  
RUN dotnet publish "WebshopProject.csproj" -c Release  -o /server/publish 
  
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
EXPOSE 8080
COPY --from=build /server/publish/* .


ENTRYPOINT ["dotnet", "WebshopProject.dll"]

