FROM gradle:7.4.2-jdk11 AS backend-build
WORKDIR /app

COPY backend /app

RUN gradle build -x test

FROM tomcat:9.0

WORKDIR /app


COPY --from=backend-build /app/build/libs/crud-back-0.0.1.jar /app/crud-back-0.0.1.jar

COPY frontend /usr/local/tomcat/webapps/ROOT

EXPOSE 8080

CMD ["catalina.sh", "run"]