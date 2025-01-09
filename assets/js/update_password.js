document.addEventListener("DOMContentLoaded", () => {
  const updatePasswordForm = document.getElementById("updatePasswordForm");
  const email = localStorage.getItem("email"); // Ambil email dari localStorage

  // Periksa apakah email tersedia di localStorage
  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Kesalahan",
      text: "Email tidak ditemukan. Silakan ulangi proses lupa password.",
    });
    window.location.href = "/forgot-password"; // Redirect ke halaman lupa password
    return;
  }

  updatePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validasi: Periksa apakah kedua password cocok
    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Password baru dan konfirmasi password harus diisi.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Password baru dan konfirmasi password tidak cocok!",
      });
      return;
    }

    console.log("Email:", email); // Debugging: Lihat email yang akan dikirim
    console.log("Password Baru:", newPassword); // Debugging: Lihat password baru

    try {
      // Kirim permintaan untuk reset password
      const response = await fetch(
        "https://backend-eight-phi-75.vercel.app/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // Pastikan email dari localStorage valid
            newPassword: newPassword, // Password baru sesuai format API
          }),
        }
      );

      const result = await response.json();
      console.log("Reset Password Response:", result); // Debugging: Lihat respons API

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Password Anda telah berhasil diubah.",
        }).then(() => {
          window.location.href = "/login"; // Redirect ke halaman login
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message || "Gagal mengubah password. Coba lagi nanti.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan pada server.",
      });
    }
  });
});
