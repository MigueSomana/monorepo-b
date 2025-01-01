# [![removebg-preview-1.png](https://i.postimg.cc/cHG7fpFC/removebg-preview-1.png)](https://postimg.cc/R3GnBD5x) Wallet.usd

## Configuración Inicial

### Instalando dependencias

Para instalar todas las dependencias necesarias

```bash
//En la carpeta raiz

npm run install:all
```
> En caso de problemas con la instalación de paquetes verificar el final de este documento

Para iniciar los servidores de backend y frontend

```bash
npm run dev
```
> El localhost de backend es el puerto 3000 y el de frontend es el puerto 4200

### Usando Docker

Para iniciar el proyecto con Docker (Sin usar dependencias)
```bash
//En la carpeta raiz
docker-compose build
docker.compose up
```
> Este es un metodo alternativo y más directo
> El localhost de backend es el puerto 3000 y el de frontend es el puerto 4200

## Instrucciones Completas de la Web

[![image.png](https://i.postimg.cc/TYxm28wY/image.png)](https://postimg.cc/3WLW9cmP)

Al acceder lo primero que te recibe es la pantalla de inicio, la cual dispone de 4 opciones:
- **Ver Instrucciones**
- **Gestión de Contactos**
- **Operaciones de Balance**
- **Información de Contacto**

## Ver Instrucciones

[![image.png](https://i.postimg.cc/rsXYV5QH/image.png)](https://postimg.cc/N9Dxb2h8)

Al hacer click en el boton de Ver Instrucciones se desplegara una ventana modal la cual permite ver unas instrucciones básicas de las funcionalidades de la web sin profundizar demasiado, en este caso, se centra principalmente en los inputs de cada apartado.

## Gestión de Contactos
Al hacer click en esta opcion se despliega una ventana modal con 2 opciones dentro de si, agregar contacto y editar contacto.
### Agregar Contacto
[![image.png](https://i.postimg.cc/MGB7WNNW/image.png)](https://postimg.cc/bGzDgCqM)

En este hay 2 inpunts a rellenar, son obligatorios, uno para el nombre y otro para el email, el cual posee su validación de formato de email.
### Editar Contacto
[![image.png](https://i.postimg.cc/g2XRD1Yv/image.png)](https://postimg.cc/rDTKynRm)

En este estan los mismos inputs del apartado anterior, pero deshabilitados, hasta que sea seleccionado un contacto, en el dropdown superior, ya que este sera el contacto a modificar, luego de seleccionarlo se precargan los valores de la seleccion en los inputs, y permite editar exclusivamente el nombre, de acuerdo a las especificaciones dadas.

## Operaciones de Balance
[![image.png](https://i.postimg.cc/KYtTXL3j/image.png)](https://postimg.cc/4KNyVY5R)

Al hacer click en esta opcion se despliega una ventana modal como la que se ve arriba, en donde se debe seleccionar el contacto el cual realizara las operaciones (se puede cambiar en cualquier momento) al haber seleccionado un contacto se habilitaran los inputs de especificar el tipo de operación que puede ser COBRAR (Aumentar el Balance) o PAGAR (Reducir el Balance), a su vez, al seleccionar un contacto se despliega una tabla que enlista todas las operaciones de dicho contacto.

## Información de Contacto
[![image.png](https://i.postimg.cc/vH6HSyVH/image.png)](https://postimg.cc/xcn2cW5W)

Al hacer click en esta opcion se desplega una ventana modal en la cual solamente hay un input select para seleccionar uno de los contactos disponibles, y visualizar su información basica, asi como su historial de transacciones

## Problemas con la configuración Inicial

En caso de no funcionar al hacer el npm run install:all, se recomienda instalar cada modulo de forma manual, para lo cual se listan a continuación
```bash
//En la carpeta raiz

npm i concurrently
cd api
npm i cors
npm i dotenv
npm i express-validator
npm i express
npm i mongoose
npm i -D @types/cors
npm i -D @types/express
npm i -D @types/node
npm i -D nodemon
npm i -D ts-node
npm i -D typescript
cd..
cd web
npm i @angular-devkit/build-angular
npm i @angular/animations
npm i @angular/cli
npm i @angular/common
npm i @angular/compiler-cli
npm i @angular/compiler
npm i @angular/core
npm i @angular/forms
npm i @angular/platform-browser-dynamic
npm i @angular/platform-browser
npm i @angular/router
npm i @popperjs/core
npm i bootstrap-icons
npm i bootstrap
npm i jquery
npm i rxjs
npm i tslib
npm i zone.js
npm i -D @types/jasmine
npm i -D jasmine-core
npm i -D karma-chrome-launcher
npm i -D karma-coverage
npm i -D karma-jasmine-html-reporter
npm i -D karma-jasmine
npm i -D karma
npm i -D typescript

//Ya no deberia dar problemas al correr el servidor
```
*Este proyecto fue hecho como parte de la prueba técnica de Aether Solutions*
