# App - Backend

```bash
 deno run --allow-net --watch --config deno.json --unstable src/app.ts
```

config paths in deno

```json
{
  "compilerOptions": {
    "paths": {
      "/@/*": "./src/*"
    }
  }
}
```
