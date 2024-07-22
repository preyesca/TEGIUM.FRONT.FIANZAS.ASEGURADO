<p align="center">
  <a href="https://cibergestion.com.mx/" target="blank"><img src="https://teggium.com/assets/img/logo-teggium.png"  alt="Teggium_logo" /></a>
</p>

<h2 align="center">Web | Portal Asegurado <b>(Marsh)</b></h2>

## 📌 Instaladores

Herramientas requeridas para el desarrollo.

| Nombre                                                                                |
| ------------------------------------------------------------------------------------- |
| [Visual Studio Code](https://code.visualstudio.com/)                                  |
| [Node.js](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi)                     |
| [MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.5-signed.msi) |
| [Git](https://git-scm.com/download/win)                                               |
| [Postman](https://dl.pstmn.io/download/latest/win64)                                  |
| [Angular](https://angular.io/guide/setup-local#install-the-angular-cli)               |

## 🛠️ Iniciar aplicación (Development)

Se requiere tener en ejecución los siguientes proyectos:

| Aplicación                                       | Url                                 |
| :----------------------------------------------- | :---------------------------------- |
| [Api Gateway](http://localhost:5080/api/swagger) | `http://localhost:5080/api/swagger` |
| [Web](http://localhost:5081)                     | `http://localhost:5081`             |

Para iniciar la aplicación se necesita ejecutar alguno de estos comandos:

```bash
npm start

ng serve
```

## 🛠️ Despliegue

Obtener el compilado del aplicativo para publicar en otro ambiente:

| Ambiente | Comando              |
| :------- | :------------------- |
| DEV      | `npm run deploy_dev` |
| QA       | `npm run deploy_qa`  |
| PROD     | `npm run deploy_pro` |
