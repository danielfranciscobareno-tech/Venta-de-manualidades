// Login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// 🔧 Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6i5fOo7_g_GyvVDZqA3KdI0wL46LSBmw",
  authDomain: "studio-6064256749-30e66.firebaseapp.com",
  projectId: "studio-6064256749-30e66",
  storageBucket: "studio-6064256749-30e66.appspot.com",
  messagingSenderId: "196390592287",
  appId: "1:196390592287:web:302538191937b337735a2a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Escuchar el evento de envío del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("Usu").value.trim();
    const clave = document.getElementById("Contra").value.trim();

    if (!usuario || !clave) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    try {
      console.log("🔍 Verificando usuario:", usuario);

      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("usuario", "==", usuario), where("clave", "==", clave));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("✅ Inicio de sesión exitoso. Redirigiendo...");
        localStorage.setItem("usuario", usuario);

        // Redirige a productos.html (ajusta la ruta según tu estructura)
        setTimeout(() => {
          window.location.href = "productos.html";
        }, 1500);
      } else {
        alert("❌ Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("❌ Error al verificar el usuario:", error);
      alert("Ocurrió un error al iniciar sesión. Revisa la consola.");
    }
  });
});
