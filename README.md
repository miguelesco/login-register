# Snippet
Descargar el repositorio, correr:

npm install

npm start

Ya con eso el servidor iniciará en el puerto 3001.

Para testear la app, ir al http://localhost:3001/login&register/index.html ahi estará la app con login y register, si quieren probar el login, que sería el snippet dado al usuario profesional, tendrán que irse al http://localhost:3001/login/index.html, ahí estará esa app unicamente, sin embargo el snippet de javascript con fetch que retorna el inicio de sesión, funciona perfectamente en una aplicacion javascript cualquiera. 

Código:

El código se divide en:

*src (Donde se encuentra todo el código del backend, hecho en typescript)

	-index.ts (Se encuentra el puerto y es el que maneja la app)

	-app.ts (Aqui está toda la configuracion necesaria de express)
	
	-routes (El directorio donde se encuentran todas las rutas necesarias)

		#firebase.ts (Se encuentran las rutas del controlador de firebase)
	
	-controllers (El directorio donde se encuentran todos los controladores, para usarse en las rutas específicas)

		#firebase.ts (Se encuentran el controlador de firebase)

	-services (El directorio donde se almacenan todas las funciones a ser usadas por los controladores)

		#firebase.ts (Se encuentran las funciones de firebase)

	-interfaces (El directorio donde se almacenan todas las interfaces y tipos para el manejo de los controladores y servicios)

		#database.ts (Se encuentran todas las interfaces y tipos necesarias para la base de datos)

*build (Donde se encuentra todo el código procesado del backend en javascript, además de q se encuentran la sección del cliente)

	// Contiene las mismas carpetas del src a excepcion de:

	-client (Donde se almacena toda la información pública)

		#img (Donde se almacenan las imágenes)

		#login (Donde se almacena el código usado para el login (snippet))

		#login&register (Donde se almacena el código usado para el login&register)


Aclaraciones:

Hay varias secciones que no se realizaron con el cuidado de un código de producción, como esta prueba es para ver como es nuestro estilo de código, en toda la sección del backend, es por parte de Gabriel, y del cliente es por parte de Miguel a excepción de algunos scripts

Faltarían por realizar cosas como manejo de errores y demás, simplemente se hizo comprobación de datos al inicio de cada controlador, sin embargo clases específicas para manejar errores serían necesarias

A su vez en el lado del cliente, los errores se muestran en consola, no hay ningun sistema para mostrarlos.

El código del backend estuvo listo desde el 26 de agosto, sin embargo tuve unos problemas con la conexión del front con el backend, es la primera vez q realizo algún tipo de embed de html con express, por lo cual tuve q ir aprendiendo sobre la marcha, y se presentó un problema donde no me dejaba interactuar (por parte del cliente) con su respectivo script, despues de dia y medio de investigación, me di cuenta de que era un bug que ocurria por un plugin instalado en mi laptop para correr el html como un live server.

Me gustaria correcciones en esa área visto que es la primera vez q lo hago.


