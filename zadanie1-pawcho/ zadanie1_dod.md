# Zadanie 1 Dodatkowe - PAwChO

Autor: Hubert Jędruchniewicz - 99557

## Polecenia:

- W celu zalogowania do Docker Hub: `docker login`
- Zbudowanie obrazu i umieszczenie na Docker Hub: `docker buildx build --platform linux/amd64,linux/arm64 -t <nazwa-uzytkownika>/zadanie1-pawcho --push .`
- Mainfest obrazu: `docker buildx imagetools inspect docker.io/s99557/zadanie1-pawcho`