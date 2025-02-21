# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
# Önce sadece bağımlılıkları indir
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Bekleme scripti ekle
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# Uygulamayı başlat
ENTRYPOINT ["./wait-for-it.sh", "mysql:3306", "--timeout=60", "--", "java", "-jar", "app.jar"] 