## Pré - Requisitos
Abaixo estão listados os pré-requisitos do código.
```
sudo apt install mysql-server composer
curl -fsSL https://php.new/install/linux/8.4
```

## Dependências
Para instalar as dependências da aplicação execute:
```
composer install
npm i
```
Arquivo _.env.example_ deve ser renomeado para _.env_ e deve ser preenchido com chaves de api e informações do banco de dados.
## Banco de dados
Para gerar um novo banco de dados utilize os comandos abaixo.
```
php artisan key:generate
php artisan migrate:fresh --seed
```

## Iniciar aplicação
Utilize um dos comandos abaixo para iniciar a aplicação.
```
php artisan serve
composer run dev
```

## Logins de Teste
- Admin
    - Email: admin@example.com
    - Senha: password
  - User
    - Email: test@example.com
    - Senha: password
