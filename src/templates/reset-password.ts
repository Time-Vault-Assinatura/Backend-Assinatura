const forgotPassword = (token, nameUser, userEmail) => {
  const encodedEmail = encodeURIComponent(userEmail)
  const resetLink = `http://localhost:5173/reset-password?token=${token}&email=${encodedEmail}`

  return `
          <!doctype html>
          <html lang="pt-BR">
        
          <head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>Reset Password Email Template</title>
              <meta name="description" content="Reset Password Email Template.">
              <style type="text/css">
                .password-reset-link {
                text-decoration: none !important;
                }
              </style>
          </head>
        
          <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
              <!--100% body table-->
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                      <td>
                          <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                              align="center" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td style="height:80px;">&nbsp;</td>
                              </tr>
                              <tr>
                                  <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                  <td>
                                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                          style="max-width:670px;background:#343434; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                          <tr>
                                              <td style="height:30px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                              <td style="padding:0 35px;">
                                                  <h1 style="color:#EFCC2D; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Você esqueceu sua senha?</h1>
                                                  <span
                                                      style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                  <p style="color:#ffffff; font-size:15px;line-height:24px; margin:0;">Olá, ${nameUser}.
                                                      <br>
                                                      <br>
                                                      Recebemos uma solicitação para restaurar sua senha de acesso em nosso site.
                                                      <br>
                                                      Se você reconhece essa ação, clique abaixo para prosseguir:</p>
                                                  <a href="${resetLink}" style="margin-top:35px; padding:10px 24px;display:inline-block; background-color: #EFCC2D; color: #000000;">Redefinir senha</a>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                      </table>
                                  </td>
                              <tr>
                                  <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                  <td style="text-align:center;">
                                      <p style="font-size:14px; color:#cccccc; text-decoration:none; line-height:18px; margin:0 0 0;">&copy; <strong>www.vaultresearch.com.br</strong></p>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="height:80px;">&nbsp;</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
              <!--/100% body table-->
          </body>
        
          </html>
            `
}

export default forgotPassword
