# Kanban Issues Mapping (Alkemion Studio)

Based on the Product Requirements Document (PRD), the following issues should be tracked in the project board for Phase 2 and beyond.

---

## 🛠 Fase 2: Estrutura e Navegação

### Issue #2: Content Tree (Sidebar)
**Type:** `feat`
**Description:** Implementar a barra lateral esquerda (Sidebar) para navegação estrutural. O usuário deve ser capaz de criar pastas e arquivos em uma hierarquia de árvore, e visualizar a estrutura completa da sua campanha.
**Acceptance Criteria:**
- Barra lateral expansível/colapsável.
- Criação, renomeio e exclusão de pastas/arquivos (Nós).
- Arrastar e soltar (Drag-and-Drop) de um item da árvore para o canvas para instanciar o nó no quadro.

---

## 🛠 Fase 3: Ativos e Imagens

### Issue #3: Asset Management (Imagens no Quadro)
**Type:** `feat`
**Description:** Implementar o upload e visualização de imagens nativas no quadro visual (canvas).
**Acceptance Criteria:**
- Botão "Adicionar Imagem" no menu de contexto do canvas.
- Seleção de arquivos locais e armazenamento no IndexedDB (blobs).
- Renderização de Nós customizados para imagens no React Flow.
- Redimensionamento de imagens no canvas.

---

## 🛠 Fase 4: Experiência do Quadro (Canvas UX)

### Issue #4: Board Views (Câmeras Salvas)
**Type:** `feat`
**Description:** Permitir que o Mestre do Jogo salve estados do quadro (posição X/Y e nível de zoom) como "Board Views".
**Acceptance Criteria:**
- Menu lateral direito ou dropdown listando Views salvas.
- Botão "Salvar View Atual".
- Ao clicar em uma View salva, a câmera desliza (pan/zoom suave) para a coordenada exata.

### Issue #5: Board Settings (Configurações)
**Type:** `feat`
**Description:** Implementar configurações visuais e funcionais para o quadro.
**Acceptance Criteria:**
- Alterar cores de fundo e tipo da grade (Grid, Dots, Crosses).
- Habilitar/Desabilitar 'Snap to Grid' (Atração magnética).

---

## 🛠 Fase 5: Distribuição e Desktop

### Issue #6: Migração para Desktop (Tauri/Electron)
**Type:** `chore`
**Description:** Empacotar a aplicação web (offline-first) em um executável desktop nativo usando Tauri ou Electron.
**Acceptance Criteria:**
- Configuração do wrapper.
- Acesso nativo ao File System (para imagens e arquivos, substituindo IndexedDB se necessário).
- Builds funcionais para Windows, macOS e Linux.

---

## 🐛 Backlog & Refactoring

### Issue #7: Suporte Avançado no TipTap
**Type:** `feat`
**Description:** Adicionar suporte a tabelas e imagens inline dentro do rich text editor.
**Acceptance Criteria:**
- Menu flutuante (bubble menu) no editor.
- Inserção de tabelas markdown-like.
