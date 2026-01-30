
# 📦 Sistema de Gestión – Instrucciones de Ejecución

Este sistema funciona completamente con **Docker**, por lo que **NO es necesario instalar XAMPP, WAMP, Node, ni MySQL**.

Solo se requiere **Docker Desktop**.

---

## ✅ 1. Requisito previo (solo la primera vez)

Instalar **Docker Desktop**:

🔗 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

Después de instalarlo, **abrir Docker Desktop** y verificar que diga *“Docker is running”*.

---

## ▶️ 2. Ejecutar el sistema

1. Descomprimir el archivo `.zip` del proyecto
2. Abrir la carpeta del proyecto
3. Hacer **doble clic** en el archivo:

```
start.bat
```

Esto iniciará automáticamente:

* Servidor Web (Apache + PHP)
* Base de Datos MySQL
* Aplicación Frontend

⏳ La primera vez puede tardar 1–3 minutos.

---

## 🌐 3. Abrir el sistema

Cuando termine de cargar, abrir el navegador y entrar a:

```
http://localhost:8080
```

---

## 🛑 4. Detener el sistema

Cuando termine de usar el sistema, hacer doble clic en:

```
stop.bat
```

Esto apagará los servidores y liberará los recursos.

---

## 🗄️ Base de Datos

La base de datos se crea automáticamente al iniciar el sistema por primera vez.
No es necesario importar archivos manualmente.

---

## ⚠️ Notas Importantes

* Docker debe estar **abierto** antes de ejecutar `start.bat`
* No usar el puerto **8080** para otros programas mientras el sistema esté en uso
* Si algo falla, cerrar Docker Desktop, volverlo a abrir y ejecutar nuevamente `start.bat`

---

## 👨‍💻 Autor

Sistema desarrollado como parte de prácticas preprofesionales universitarias.
