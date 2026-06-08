# Guia de Contribuição — GP6


## 1. Visão Geral

Este projeto faz parte de uma entrega técnica vinculada a um cliente externo.
Todo o conteúdo, código, documentação e histórico de alterações são **confidenciais**
e não devem ser compartilhados, replicados ou referenciados fora do escopo desta equipe
sem autorização expressa do responsável técnico do grupo.

---

## 2. Acesso ao Repositório

- O acesso é gerenciado exclusivamente pelo(s) mantenedor(es) do repositório.
- Novos membros devem ser adicionados formalmente pelo responsável técnico.
- O compartilhamento de credenciais ou tokens de acesso é **estritamente proibido**.
- Ao encerrar a participação no projeto, o acesso deve ser revogado imediatamente.

---

**Nenhum commit direto na branch `main` é permitido**, salvo em situações de emergência
documentadas e aprovadas pelo responsável técnico.

---

## 3. Fluxo de Trabalho

1. Certifique-se de que sua branch local está atualizada com `dev`:
   ```bash
   git checkout dev
   git pull origin dev

2. Crie uma branch a partir de dev seguindo a nomenclatura definida:
  ```bash
  git checkout -b feature/nome-da-funcionalidade
  ```

3. Desenvolva, comite e mantenha o histórico limpo.

4. Abra um Pull Request de sua branch para dev.

5. O PR deve ser revisado por ao menos um outro membro da equipe antes do merge.

6. Após aprovação, o merge é realizado pelo revisor ou pelo responsável técnico.


## 4. Padrão de Commits

- Utilize o padrão Conventional Commits em português ou inglês, de forma consistente:
   ```bash
      <tipo>(<escopo opcional>): <descrição curta no imperativo>
   ```
- Tipos aceitos:

| Tipo              | Uso                   |            |
| :---------------- | :---------------------- | :----------------- |
| _feat_   | Nova funcionalidade |
| _fix_   | Correção de bug | 
| _docs_ | Alterações em documentação | 
| _refactor_    | Refatoração sem mudança de comportamento |
| _test_   | Adição ou ajuste de testes | 
| _chore_   | Tarefas de manutenção, configuração ou build | 
| _style_   | Formatação, espaçamento (sem impacto funcional) | 

## 5. Pull Requests

Ao abrir um PR, preencha obrigatoriamente:

- Descrição: o que foi feito e por quê.
- Tipo de mudança: funcionalidade, correção, refatoração, documentação.
- Como testar: passos para validar a mudança localmente.
- Checklist:
     - O código foi testado localmente
     - Não há conflitos com dev
     - A documentação foi atualizada, se aplicável
     - Nenhuma credencial ou dado sensível foi exposto

PRs com descrição vazia ou insuficiente poderão ser recusados para revisão.

## 6. Issue/Bug Tracker

A formatação para relatório de problemas encontrados deve seguir a formatação
  ```bash
  Issue/Local do problema encontrado
  ```

Qualquer informação adicional deve ser devidamente comunicada na descrição

## 7. Conformidade

O não cumprimento das diretrizes deste guia pode resultar em:

- Solicitação de revisão ou retrabalho da contribuição.
- Suspensão temporária do acesso ao repositório.
- Registro formal junto ao responsável do projeto.
     


