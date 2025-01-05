async function checkPromoCode() {
  const promoCode = document.getElementById('promoCode').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!promoCode) {
    resultDiv.innerHTML = '<span class="warning">Por favor, insira um código válido.</span>';
    return;
  }

  try {
    // Exemplo fictício de verificação de código. Substitua pela sua API real.
    const response = await fetch(`https://ptb.discord.com/api/v9/entitlements/gift-codes/${promoCode}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer SEU_TOKEN_AQUI', // Substitua com o token
      }
    });

    if (response.ok) {
      const data = await response.json();
      const expiresAt = new Date(data.expires_at);
      const isValid = data.uses < data.max_uses;

      // Formatando data de expiração
      const formattedDate = `${expiresAt.toLocaleDateString()} ${expiresAt.toLocaleTimeString()}`;

      if (isValid) {
        resultDiv.innerHTML = `<span class="valid">https://promos.discord.gg/${promoCode} - ✅ | Valid - Expires: ${formattedDate}</span>`;
      } else {
        resultDiv.innerHTML = `<span class="invalid">https://promos.discord.gg/${promoCode} - ❌ | Resgatado | Expired</span>`;
      }
    } else {
      resultDiv.innerHTML = `<span class="invalid">Código Inválido: ${promoCode}</span>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<span class="warning">Erro ao verificar o código: ${error.message}</span>`;
  }
}
