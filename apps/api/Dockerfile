FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @nexusops/api build
EXPOSE 3001
CMD ["pnpm","--filter","@nexusops/api","start:prod"]
