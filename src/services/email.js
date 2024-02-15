import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_AUTH_ADDRESS,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASS,
  },
});

export async function sendEmailVerification(to, link) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: to,
    subject: "Verdex Email Verification",
    text: emailText(link),
    html: emailHTML(link),
  });
}

function emailText(link) {
  const text = `
          Terima kasih telah mendaftar di situs kami. Untuk melanjutkan proses registrasi, kami memerlukan verifikasi alamat email Anda.
          
          Silakan klik tautan di bawah ini untuk memverifikasi email Anda:
          
          ${link} 
          
          PERINGATAN: Mohon untuk tidak mengklik tautan ini jika Anda tidak yakin telah mendaftar di di verdex kami. 
          
          Terima kasih atas perhatiannya.
          
          Salam hangat,
          verdex"`;

  return text;
}

function emailHTML(link) {
  const html = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verifikasi Email</title>
          </head>
          <body style="font-family: Arial, sans-serif;">
          
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px;">
                <h1>Verifikasi Email</h1>
                <p>Terima kasih telah mendaftar di situs kami. Untuk melengkapi proses registrasi, harap verifikasi alamat email Anda dengan mengklik tautan di bawah ini:</p>
                <p style="margin: 30px 0;">
                  <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verifikasi Email</a>
                </p>
                <p>Jika Anda tidak mendaftar di situs kami, Anda bisa mengabaikan email ini.</p>
              </div>
              <hr style="border: none; border-top: 1px solid #dddddd;">
              <div style="text-align: center; padding: 20px;">
                <p>Terima kasih,<br>Tim Kami</p>
              </div>
            </div>
          
          </body>
          </html>`;

  return html;
}
