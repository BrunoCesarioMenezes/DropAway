<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuário</title>
</head>
<body>

    <h1>Editar Usuário</h1>

    <form method="POST" action="#">
        @csrf

        <p>
            <label>Nome:</label><br>
            <input type="text" name="name" value="{{ $user->name }}">
        </p>

        <p>
            <label>Email:</label><br>
            <input type="email" name="email" value="{{ $user->email }}">
        </p>

        <button type="submit">Salvar</button>
    </form>

    <br>

    <a href="{{ route('admin.users.index') }}">Voltar</a>

</body>
</html>
