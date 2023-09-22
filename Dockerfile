# Use uma imagem oficial do Node.js como base
FROM node:16

# Defina a pasta /app como diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (ou yarn.lock, se estiver usando Yarn) para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos e diretórios restantes para o contêiner
COPY . .

# Informe ao Docker que o app escuta na porta 3000 em tempo de execução
EXPOSE 3000

# Inicie o aplicativo React
CMD ["npm", "start"]
