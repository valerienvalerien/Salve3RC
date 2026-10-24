FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
USER node
HEALTHCHECK CMD node -e "fetch('http://localhost:'+process.env.PORT+'/api/status').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
