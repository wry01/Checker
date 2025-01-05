// Função para verificar um link
async function verificarLink(link) {
    try {
        // Simula a verificação de link (substitua por API real, se houver)
        const resposta = await fetch(link, { method: "GET" });
        
        if (resposta.ok) {
            const plano = "Mensal"; // Ajuste para detectar o plano real
            const expira = "31/01/2025"; // Substitua pela lógica correta

            return { status: "válido", plano, expira };
        } else {
            return { status: "inválido", plano: "Desconhecido", expira: "Desconhecido" };
        }
    } catch (erro) {
        return { status: "erro", plano: "Desconhecido", expira: "Desconhecido" };
    }
}

// Função para verificar múltiplos links
async function verificarLinks() {
    const areaDeTexto = document.getElementById("areaDeLinks").value.split("\n");
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = "";

    for (const link of areaDeTexto) {
        if (link.trim()) {
            const resultado = await verificarLink(link.trim());

            // Adiciona o resultado ao HTML
            resultados.innerHTML += `
                <div style="margin-bottom: 10px;">
                    <p><strong>Link:</strong> ${link}</p>
                    <p><strong>Status:</strong> ${resultado.status}</p>
                    <p><strong>Plano:</strong> ${resultado.plano}</p>
                    <p><strong>Expira:</strong> ${resultado.expira}</p>
                    <hr>
                </div>
            `;
        }
    }
              }
