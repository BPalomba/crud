FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . .

RUN ./gradlew build

COPY build/libs/crud-back-0.0.1.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]