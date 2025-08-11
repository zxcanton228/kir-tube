build:
	docker-compose up -d --build
db-init: 
	docker-compose exec backend bun prisma db push --skip-generate
	docker-compose exec backend bun seed:prod

back:
	docker-compose up backend -d --build 
db:
	docker-compose up database -d --build 
front:
	docker-compose up frontend nginx -d --build 

restart-frontend:
	docker compose down frontend && docker rmi kerilka/kirube-frontend && docker compose up -d frontend
restart-backend:
	docker compose down backend && docker rmi kerilka/kirube-backend && docker compose up -d backend

cert-init: 
	docker compose run --rm certbot \
	 certonly --webroot --webroot-path /var/www/certbot/ \
	  -d kirtube.kerove.ru \
		-d api.kirtube.kerove.ru \
		--email kirillvegele10@gmail.com \
		--dry-run 

cert:
	docker compose run --rm certbot \
	 certonly --webroot --webroot-path /var/www/certbot/ \
	  -d kirtube.kerove.ru \
		-d api.kirtube.kerove.ru \
		--email kirillvegele10@gmail.com \


up:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down -v