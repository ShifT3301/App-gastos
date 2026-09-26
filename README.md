# 💸 App de Controle de Gastos Mensais

Aplicação web **local**, em um único arquivo (`index.html`), feita com HTML + CSS + JavaScript puro — sem framework, sem build e sem servidor. Os dados ficam em um arquivo `.json` no seu computador.

## Como usar

**Online (computador ou celular):** acesse <https://shift3301.github.io/App-gastos/> (publicado pelo GitHub Pages).

**No iPhone:** abra o endereço acima no Safari → *Compartilhar* → *Adicionar à Tela de Início*. O app abre como um aplicativo, funciona sem internet e os dados ficam salvos automaticamente no aparelho. Use **Exportar** de vez em quando para guardar um backup (“Salvar em Arquivos”).

**No computador, sem internet:** abra o `index.html` direto (duplo clique).

Para testar com dados prontos, importe o `gastos-exemplo.json`.

### Onde os dados ficam

| Navegador | Como salva |
|---|---|
| Chrome / Edge (computador) | **Salvar** grava direto no arquivo `.json` escolhido (File System Access API). O app lembra o arquivo entre sessões. |
| iPhone, Android, Firefox, Safari | Salvo **automaticamente no navegador** do aparelho. **Exportar** gera um backup `.json` (no celular, pelo menu Compartilhar) e **Importar** carrega um arquivo, substituindo os dados do aparelho. |

Não há sincronização entre aparelhos: para passar os dados de um para outro, exporte num e importe no outro.

Se, abrindo pelo `file://` no computador, algo não funcionar, rode um servidor local na pasta do app:

```bash
python3 -m http.server
# e acesse http://localhost:8000
```

Os gráficos usam Chart.js via CDN: precisam de internet no primeiro acesso (depois ficam em cache no modo app). Sem eles, o resto do app funciona normalmente.

## Publicação (GitHub Pages)

O repositório não precisa de build: `index.html`, `manifest.webmanifest`, `sw.js` (funcionamento offline) e os ícones são servidos como estão. Em *Settings → Pages*, a fonte (“Source”) é **GitHub Actions**: o workflow `.github/workflows/pages.yml` publica o site a cada push na branch padrão. Ao alterar o app, aumente a versão `CACHE` em `sw.js` para os aparelhos buscarem os arquivos novos.

## Funcionalidades

- Gastos (data, categoria, descrição, valor) e receitas (data, descrição, valor): adicionar, editar e excluir.
- **Detecção de gasto fútil** por palavras-chave (sem diferenciar maiúsculas/acentos). O app sugere, você confirma ou recusa — e pode marcar manualmente. As palavras-chave são editáveis em ⚙️ Configurações.
- **Recorrentes** (ex.: aluguel, salário): lançados automaticamente quando um mês novo é iniciado. Alterá-los não muda meses já lançados, a menos que você use “Lançar e atualizar valores” nas Configurações.
- **Dashboard do mês**: total recebido, total gasto, saldo (verde/vermelho), categoria que mais consumiu o orçamento e total de gastos fúteis (R$ e %).
- **Visão contínua**: card de *saldo acumulado* (saldo inicial + receita total − gasto total até o mês exibido) e tabela *Resumo contínuo* com todos os meses em sequência e o acumulado linha a linha. O saldo inicial é definido em ⚙️ Configurações.
- Orçamento mensal com barra de uso e alerta a partir de 80% e ao ultrapassar.
- Gráfico de gastos por categoria e comparação mês a mês (receitas, gastos, saldo do mês e saldo acumulado).
- Filtros por texto, categoria e fútil/não fútil; navegação entre meses.
- Modo escuro, layout responsivo, instalável na tela de início (PWA) e com funcionamento offline.

## Formato do arquivo

Segue o modelo da spec (`versao`, `categorias`, `categoriasFuteis`, `recorrentes`, `meses`), mais `saldoInicial` (número, padrão 0). Lançamentos gerados a partir de um recorrente têm também `recorrenteId`, para o app saber que já foram lançados naquele mês. Campos desconhecidos são preservados.

## Limitações

- Sem backend: não há sincronização automática entre dispositivos. O arquivo é a única fonte de verdade (dá para movê-lo pelo Google Drive, por exemplo).
- A classificação de “gasto fútil” é uma heurística de texto e pode errar (ex.: “bar” também casa com “barbeiro”). Sempre dá para corrigir manualmente.
