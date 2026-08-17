FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @nexusops/web build
EXPOSE 3000
CMD ["pnpm","--filter","@nexusops/web","start"]
