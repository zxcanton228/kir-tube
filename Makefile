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
	docker-compose up frontend nginx -d 

up:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down -v