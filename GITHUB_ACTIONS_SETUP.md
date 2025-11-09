# 🚀 Próximos Passos

## 1. Configure os Secrets no GitHub

Vá em: **Repositório > Settings > Secrets and variables > Actions**

Adicione 3 secrets:

### KEYSTORE_BASE64
Cole o conteúdo do arquivo `keystore-base64.txt`

### KEYSTORE_PASSWORD
A senha que você definiu para o keystore

### KEY_PASSWORD  
A senha que você definiu para a chave (alias "release")

## 2. Commit e Push

```bash
git add .
git commit -m "ci: setup GitHub Actions for APK build"
git push origin main
```

## 3. Criar Release

Para gerar APK:

```bash
git tag v1.0.0
git push origin v1.0.0
```

O APK será gerado automaticamente e anexado à release!

## 4. Download

- **Via Actions**: Actions > Workflow > Download artifact
- **Via Release**: Releases > Latest > Download APK

## 🎯 Pronto!

Sempre que você criar uma tag, um APK será gerado automaticamente.
