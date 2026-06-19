import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  secure: false,
  auth: {
    user: 'resend',
    pass: 're_15gys8WR_Kfgtg4yY5UeVmnXFmQWkdwYh',
  },
})

try {
  const info = await transporter.sendMail({
    from: 'onboarding@resend.dev',
    to: 'recyclingpointss@gmail.com',
    subject: 'Test Resend SMTP',
    text: 'Si ves esto, Resend funciona desde Railway',
  })
  console.log('Enviado:', info.messageId, info.response)
} catch (err) {
  console.error('Error:', err.message, err.code)
}
