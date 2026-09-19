# Product Requirements Document (PRD): Alkemion Studio

## 1. Visão Geral do Produto
O **Alkemion Studio** (codinome The Lost Compass) é um "Visual Workspace for Game Masters" — uma plataforma de gestão de campanhas de RPG e construção de mundos (worldbuilding). Ele combina a organização espacial de um quadro visual (infinite canvas) com a profundidade de um editor de texto rico.

## 2. Declaração do Problema
Atualmente, Mestres de Jogo (GMs) sofrem com a fragmentação de contexto. Eles utilizam ferramentas separadas para mapas mentais/diagramas e processadores de texto/wikis. Isso gera fricção constante (context-switching), perda de imersão e dificulta a visualização de relações complexas entre personagens, facções, locais e pistas.

## 3. Público-Alvo
- Mestres de Jogo de RPG de Mesa (D&D, Pathfinder, Call of Cthulhu, etc.)
- Autores de ficção e Worldbuilders
- Designers de Narrativa

## 4. Princípios de Design (Paradigma "One Workspace")
- **Visual Board + Rich Editor:** A edição de documentos ricos ocorre em modais sobrepostos ao quadro visual, mantendo o panorama geral (canvas) sempre visível.
- **Offline & Local First:** Foco absoluto em performance e disponibilidade. Sem dependência de nuvem para jogar, eliminando latência no carregamento de imagens pesadas.
- **Estrutura em Grafos (Nodes & Links):** A informação não é apenas hierárquica (pastas), mas conectada visualmente. Cada entidade é um nó em um grafo narrativo.

## 5. Requisitos Funcionais Principais

### 5.1. Infinite Canvas (Quadro Visual)
- O usuário pode navegar livremente (pan/zoom) pelo quadro.
- Ações contextuais via botão direito: Adicionar Nó, Adicionar Imagem/Widget, Configurações do Quadro.
- **Board Views:** Capacidade de salvar posições de câmera e layouts para pular rapidamente entre mapas de região, árvores de facção e fluxogramas de missões.

### 5.2. Nós e Entidades
- Todo conteúdo (texto, imagem, marcador) é tratado como um Nó.
- **Linked Nodes:** O usuário pode conectar nós com arestas (linhas) para mapear relacionamentos explícitos (ex: Facção -> Líder).

### 5.3. Rich Text Editor
- Editor incorporado que suporta formatação rica (negrito, itálico, títulos, listas, citações).
- Abre em modal ou painel lateral ao clicar em um nó, sem retirar o usuário da visualização do canvas.
- Sistema de Tags/Marcadores integrado.

### 5.4. Content Tree (Navegação Estrutural)
- Barra lateral esquerda (Sidebar) para navegação tradicional em árvore (Pastas e Arquivos).
- Permite arrastar e soltar itens da árvore para o canvas.

### 5.5. Gerenciamento de Ativos Visuais
- Biblioteca nativa de imagens com suporte a upload de arquivos locais, bookmarks e links externos.

## 6. Arquitetura Técnica (Web MVP / Desktop)
- **Frontend Framework:** React 18+ (Vite)
- **Linguagem:** TypeScript
- **Quadro Visual:** React Flow
- **Rich Text Editor:** TipTap (Headless)
- **Gerenciamento de Estado:** Zustand
- **Persistência de Dados (Local):** IndexedDB via `localforage` (garantindo funcionamento offline no MVP).
- **Estilização e UI:** Tailwind CSS + Shadcn UI (para uma estética de aplicação desktop profissional).
- **Distribuição Futura:** Tauri ou Electron para empacotamento desktop nativo.

## 7. Critérios de Aceite para o MVP (Fase 1)
- [x] O usuário consegue abrir o sistema sem conexão com a internet.
- [x] O usuário consegue criar nós de texto livremente no canvas via menu de contexto.
- [x] O usuário consegue interligar os nós arrastando conexões entre eles.
- [x] Ao dar duplo-clique em um nó, um modal de edição rica se abre.
- [x] Edições no texto são salvas e persistem após a recarga da página (IndexedDB).
