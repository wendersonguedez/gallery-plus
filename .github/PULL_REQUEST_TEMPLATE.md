### ⚛️ [Título da PR - Ex: Implementação do schema e validação dos campos]

### 📝 Descrição

[Descreva o contexto geral. Ex: Implementação do componente de formulário para adição de novas fotos, permitindo upload com preview em tempo real.]

A construção utilizou **[Tecnologia A]** integrado ao **[Tecnologia B]**, garantindo:

* **[Benefício 1]:** [Explicação. Ex: Verificação de tipos e restrições de arquivo antes do envio.]
* **[Benefício 2]:** [Explicação. Ex: Exibição dinâmica de mensagens de erro.]
* **[Benefício 3]:** [Explicação. Ex: Registro e monitoramento otimizado dos inputs.]

### ⚙️ Detalhes Técnicos

Algumas decisões arquiteturais importantes foram tomadas para garantir a segurança e a usabilidade:

1. **[Decisão Técnica 1 - Ex: Tipagem Inferida]**
    [Explique o porquê. Ex: Optei por utilizar `z.infer` para gerar os tipos do TypeScript, garantindo sincronia automática com o Zod e evitando duplicação.]

2. **[Decisão Técnica 2 - Ex: Integração via Resolver]**
    [Explique o porquê. Ex: O `zodResolver` intercepta a submissão e só permite o envio se os dados estiverem 100% válidos.]

3. **[Decisão Técnica 3 - Ex: Preview de Imagem (Reatividade)]**
    [Explique o porquê. Ex: Utilizei `form.watch` para assistir o input em tempo real e forçar a re-renderização do componente.]

### 💻 Exemplos de Código

**[Descrição do Trecho - Ex: Definição do Schema]**

```typescript
// [Insira o código relevante aqui]
export const photoNewFormSchema = z.object({
  title: z.string().min(1),
  // ...
});
```

**[Descrição do Trecho - Ex: Monitoramento para Preview]**

```typescript
// [Insira o código relevante aqui]
const file = form.watch("file");
const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
```

### 🔨 O que foi feito

* [ ] [Tarefa 1 - Ex: Criação do Schema de validação com Zod]
* [ ] [Tarefa 2 - Ex: Construção do formulário com React Hook Form]
* [ ] [Tarefa 3 - Ex: Configuração do zodResolver]
* [ ] [Tarefa 4 - Ex: Lógica de preview de imagem]
