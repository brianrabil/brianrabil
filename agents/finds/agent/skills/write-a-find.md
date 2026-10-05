---
description: Use when writing a find for publish_find — the exact frontmatter fields, body structure, and copy rules.
---

# Write a find

## Frontmatter (the `frontmatter` argument of `publish_find`)

- `title`: the project's name as its README writes it. 60 characters at most.
- `summary`: one sentence, 20–200 characters, that says what the project is. Example: "A TypeScript library from Vercel Labs for running WebGPU shaders, scenes, and compute in the browser and in Node."
- `url`: the repository URL, `https://github.com/owner/repo` form.
- `homepage`: the docs or project site, only if it exists and is different from the repository.
- `category`: one of `agents`, `sdks`, `inference`, `evals`, `data`, `devtools`, `ui`, `infra`.
- `tags`: up to 6 lowercase kebab-case tags, such as `mcp`, `rag`, `typescript`.
- `language`: the primary language, if known from the repository.
- `license`: the SPDX id from the repository, such as `MIT` or `Apache-2.0`. Omit it if the repository has no license file.

`date` and `author` are filled in by the tool. `slug` is lowercase kebab-case, usually the project name.

## Body (the `body` argument)

Use exactly this structure and nothing else:

1. A paragraph on what the project does, concretely: the inputs, the outputs, the main API or command.
2. A paragraph on how it works or what is notable about it, stated as facts from the sources: architecture, supported providers or runtimes, integrations, who publishes it.
3. `## Things to know` with 2–4 bullets: requirements, limitations, maturity (alpha, beta, pre-1.0), license caveats.
4. `## Try it` with the install or quick-start command copied from the README, in a fenced code block with a language tag.

No top-level `#` heading. No links other than ones taken from the sources. Keep the whole body under 250 words.

## Example

~~~md
vgpu wraps WebGPU in a small set of functions: `init` gets a device, `surface` binds a canvas, `effect` compiles a full-screen fragment shader, and `frameLoop` drives rendering. Shaders are written in WGSL, and uniforms are set by the variable names declared in the shader.

A full-screen effect is about 28 KB gzipped, and the package is safe to import from a client component in Next.js because it only touches browser APIs inside its functions.

## Things to know

- It is WebGPU only. There is no WebGL fallback.
- `vgpu check file.wgsl --require-validation` validates WGSL before deploy.

## Try it

```sh
npm install vgpu
```
~~~

## Before calling publish_find

Read the draft once more and remove any slogan, "X, not Y" construction, rhetorical question, exclamation mark, or adjective that is not backed by a source. If a sentence would work as an advertisement, rewrite it as a description.
