<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Gerenciamento de Usuários</title>
</head>
<body>

    <h1>Usuários cadastrados</h1>

    @if (session('success'))
        <p style="color: green;">
            {{ session('success') }}
        </p>
    @endif

    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>

                    <td>
                        @if ($user->photo)
                            <img src="{{ asset('storage/' . $user->photo) }}" width="50">
                        @else
                            Sem foto
                        @endif
                    </td>

                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>

                    <td>
                        <!-- EDITAR -->
                        <a href="{{ route('admin.users.edit', $user->id) }}">
                            Editar
                        </a>

                        |

                        <!-- REMOVER -->
                        <form action="{{ route('admin.users.destroy', $user->id) }}"
                              method="POST"
                              style="display:inline;">
                            @csrf
                            @method('DELETE')

                            <button type="submit"
                                onclick="return confirm('Deseja realmente remover este usuário?')">
                                Remover
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
