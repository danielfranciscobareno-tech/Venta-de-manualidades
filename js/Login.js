// Login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore, collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// 🔧 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6i5fOo7_g_GyvVDZqA3KdI0wL46LSBmw",
  authDomain: "studio-6064256749-30e66.firebaseapp.com",
  projectId: "studio-6064256749-30e66",
  storageBucket: "studio-6064256749-30e66.appspot.com",
  messagingSenderId: "196390592287",
  appId: "1:196390592287:web:302538191937b337735a2a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Manejo del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const usuario = document.getElementById("Usu").value.trim();
    const clave = document.getElementById("Contra").value.trim();

    if (!usuario || !clave) {
      alert("⚠️ Por favor, completa todos los campos.");
      return;
    }

    try {
      console.log("🔍 Verificando usuario:", usuario);

      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef,
        where("usuario", "==", usuario),
        where("clave", "==", clave)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("✅ Inicio de sesión exitoso. Redirigiendo...");

        // Guardar usuario en localStorage (opcional)
        localStorage.setItem("usuario", usuario);

        // Redirigir a productos.html
        const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
        setTimeout(() => {
          window.location.href = base + "productos.html";
        }, 1500);
      } else {
        alert("❌ Usuario o contraseña incorrectos.");
      }

    } catch (error) {
      console.error("🚨 Error al verificar el usuario:", error);
      alert("⚠️ Hubo un error al verificar el usuario. Revisa la consola.");
    }
  });
});
