fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer re_15gys8WR_Kfgtg4yY5UeVmnXFmQWkdwYh',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'onboarding@resend.dev',
    to: 'jeimynataliaastaiza@gmail.com',
    subject: 'Recycling Points - Codigo de recuperacion',
    html: '<h2>Hola jeimy,</h2><p>Tu codigo de recuperacion es:</p><h1 style="letter-spacing:8px;color:#2e7d32;">397592</h1><p>Este codigo expira en <strong>15 minutos</strong>.</p><br/><p>Equipo Recycling Points</p>',
  }),
}).then(r => r.json()).then(d => console.log('OK:', d.id)).catch(e => console.error('Error:', e.message))
