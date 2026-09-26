# 💸 App de Controle de Gastos Mensais

Aplicação web **local**, em um único arquivo (`index.html`), feita com HTML + CSS + JavaScript puro — sem framework, sem build e sem servidor. Os dados ficam em um arquivo `.json` no seu computador.

## Como usar

1. Abra o `index.html` no navegador (duplo clique).
2. Clique em **Abrir** para carregar seu arquivo (ex.: `gastos-2026.json`) — ou comece do zero e clique em **Salvar** para escolher onde guardar.
3. Lance gastos e receitas, defina o orçamento do mês e salve (**Ctrl+S** também funciona).

Para testar com dados prontos, abra o `gastos-exemplo.json`.

### Navegadores

| Navegador | Como salva |
|---|---|
| Chrome / Edge | Grava direto no arquivo aberto (File System Access API). |
| Firefox / Safari | Modo importar/exportar: **Abrir** importa o JSON e **Salvar** baixa a versão atualizada — substitua o arquivo antigo por ela. |

Se, abrindo pelo `file://`, algo não funcionar, rode um servidor local na pasta do app:

```bash
python3 -m http.server
# e acesse http://localhost:8000
```

Os gráficos usam Chart.js via CDN, então precisam de internet. Sem ela, o resto do app funciona normalmente.

## Funcionalidades

- Gastos (data, categoria, descrição, valor) e receitas (data, descrição, valor): adicionar, editar e excluir.
- **Detecção de gasto fútil** por palavras-chave (sem diferenciar maiúsculas/acentos). O app sugere, você confirma ou recusa — e pode marcar manualmente. As palavras-chave são editáveis em ⚙️ Configurações.
- **Recorrentes** (ex.: aluguel, salário): lançados automaticamente quando um mês novo é iniciado. Alterá-los não muda meses já lançados, a menos que você use “Lançar e atualizar valores” nas Configurações.
- **Dashboard do mês**: total recebido, total gasto, saldo (verde/vermelho), categoria que mais consumiu o orçamento e total de gastos fúteis (R$ e %).
- Orçamento mensal com barra de uso e alerta a partir de 80% e ao ultrapassar.
- Gráfico de gastos por categoria e comparação mês a mês (receitas, gastos e saldo).
- Filtros por texto, categoria e fútil/não fútil; navegação entre meses.
- Modo escuro, layout responsivo, botão de backup e rascunho automático no navegador para não perder alterações não salvas.

## Formato do arquivo

Segue o modelo da spec (`versao`, `categorias`, `categoriasFuteis`, `recorrentes`, `meses`). Lançamentos gerados a partir de um recorrente têm também `recorrenteId`, para o app saber que já foram lançados naquele mês. Campos desconhecidos são preservados.

## Limitações

- Sem backend: não há sincronização automática entre dispositivos. O arquivo é a única fonte de verdade (dá para movê-lo pelo Google Drive, por exemplo).
- A classificação de “gasto fútil” é uma heurística de texto e pode errar (ex.: “bar” também casa com “barbeiro”). Sempre dá para corrigir manualmente.
