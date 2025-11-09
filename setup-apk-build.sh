#!/bin/bash
# ============================================
# 📱 Setup APK Build - Termux Helper
# Prepara tudo para build de APK via GitHub Actions
# ============================================

set -e

echo "🚀 Setup para Build de APK via GitHub Actions"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

PROJ_DIR=$(pwd)
REPO_NAME=$(basename "$PROJ_DIR")

# ============================================
# 1. Verificar dependências
# ============================================
echo "📦 Verificando dependências..."

if ! command -v keytool &> /dev/null; then
  echo "⚙️  Instalando OpenJDK..."
  pkg install openjdk-17 -y
fi

if ! command -v git &> /dev/null; then
  echo "⚙️  Instalando Git..."
  pkg install git -y
fi

# ============================================
# 2. Gerar Keystore
# ============================================
if [ ! -f "release.keystore" ]; then
  echo ""
  echo "🔐 Gerando keystore para assinar o APK..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "⚠️  IMPORTANTE: Guarde essas senhas! Você vai precisar delas."
  echo ""
  
  keytool -genkey -v -keystore release.keystore \
    -alias release \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000
  
  echo ""
  echo "✅ Keystore criado: release.keystore"
else
  echo "ℹ️  Keystore já existe"
fi

# ============================================
# 3. Converter para Base64
# ============================================
echo ""
echo "🔄 Convertendo keystore para Base64..."

base64 release.keystore > keystore-base64.txt

echo "✅ Base64 salvo em: keystore-base64.txt"

# ============================================
# 4. Criar estrutura do projeto
# ============================================
echo ""
echo "📁 Criando estrutura de arquivos..."

mkdir -p .github/workflows

# ============================================
# 5. Criar workflow do GitHub Actions
# ============================================
cat > .github/workflows/build-and-release.yml << 'EOF'
name: Build PWA and Android APK

on:
  push:
    branches: [ main ]
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-pwa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build PWA
        run: npm run build
      
      - name: Upload PWA artifacts
        uses: actions/upload-artifact@v4
        with:
          name: pwa-build
          path: dist/
          retention-days: 30

  build-apk:
    needs: build-pwa
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download PWA build
        uses: actions/download-artifact@v4
        with:
          name: pwa-build
          path: dist/
      
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Setup Android SDK
        uses: android-actions/setup-android@v3
      
      - name: Create Capacitor project
        run: |
          npm install -g @capacitor/cli @capacitor/core @capacitor/android
          
          cat > capacitor.config.json << 'CAPCONFIG'
          {
            "appId": "com.$REPO_NAME.app",
            "appName": "$REPO_NAME",
            "webDir": "dist",
            "server": {
              "androidScheme": "https"
            }
          }
          CAPCONFIG
          
          npx cap add android
          npx cap sync android
      
      - name: Create keystore
        run: |
          echo "\${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > release.keystore
          
      - name: Build APK
        run: |
          cd android
          ./gradlew assembleRelease
          cd ..
      
      - name: Sign APK
        run: |
          BUILD_TOOLS_VERSION=\$(ls \$ANDROID_SDK_ROOT/build-tools | sort -V | tail -1)
          \$ANDROID_SDK_ROOT/build-tools/\$BUILD_TOOLS_VERSION/zipalign -v -p 4 \\
            android/app/build/outputs/apk/release/app-release-unsigned.apk \\
            app-aligned.apk
          
          \$ANDROID_SDK_ROOT/build-tools/\$BUILD_TOOLS_VERSION/apksigner sign \\
            --ks release.keystore \\
            --ks-key-alias release \\
            --ks-pass pass:"\${{ secrets.KEYSTORE_PASSWORD }}" \\
            --key-pass pass:"\${{ secrets.KEY_PASSWORD }}" \\
            --out app-signed.apk \\
            app-aligned.apk
      
      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: android-apk
          path: app-signed.apk
          retention-days: 90

  create-release:
    needs: [build-pwa, build-apk]
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')
    steps:
      - name: Download APK
        uses: actions/download-artifact@v4
        with:
          name: android-apk
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: app-signed.apk
          body: |
            ## 📱 Release \${{ github.ref_name }}
            
            ### 🚀 Downloads
            - Android APK attached
            
            ### ✨ Built with GitHub Actions
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
EOF

echo "✅ Workflow criado: .github/workflows/build-and-release.yml"

# ============================================
# 6. Adicionar Capacitor ao package.json
# ============================================
echo ""
echo "📝 Atualizando package.json..."

if [ -f "package.json" ]; then
  # Verificar se já tem capacitor
  if ! grep -q "@capacitor/core" package.json; then
    # Adicionar dependencies
    jq '.dependencies["@capacitor/core"] = "^6.0.0" |
        .dependencies["@capacitor/android"] = "^6.0.0"' package.json > package.tmp.json
    mv package.tmp.json package.json
    echo "✅ Capacitor adicionado ao package.json"
  else
    echo "ℹ️  Capacitor já está no package.json"
  fi
fi

# ============================================
# 7. Criar arquivo de instruções
# ============================================
cat > GITHUB_ACTIONS_SETUP.md << 'INSTRUCTIONS'
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
INSTRUCTIONS

echo "✅ Instruções salvas em: GITHUB_ACTIONS_SETUP.md"

# ============================================
# 8. Resumo final
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup completo!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Arquivos criados:"
echo "  • .github/workflows/build-and-release.yml"
echo "  • release.keystore"
echo "  • keystore-base64.txt"
echo "  • GITHUB_ACTIONS_SETUP.md"
echo ""
echo "🔐 Base64 do Keystore:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat keystore-base64.txt
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Leia GITHUB_ACTIONS_SETUP.md para próximos passos"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  1. Configure os secrets no GitHub"
echo "  2. Commit e push"
echo "  3. Crie uma tag para gerar o APK"
echo ""
