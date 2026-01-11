<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     public function index()
    {
        $users = User::select('id', 'name', 'email', 'photo')->get();

        return Inertia::render('Admin/Users/Index', [
        'users' => $users,
    ]);
    }

    public function store(Request $request)
    {
            $data = $request->validate([
            'photo'        => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'name'         => 'required|string|min:3',
            'email'        => 'required|email|unique:drivers,email',
            'password'     => 'required|string|min:6|confirmed',
        ]);


        $photoPath = null;

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('drivers_photos', 'public');
        }

        User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['password']),
            'photo'         => $photoPath,
        ]);

        return Inertia::render('Admin/Users/Index');

    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|max:255',
    ]);

    $user->update([
        'name'  => $request->name,
        'email' => $request->email,
    ]);

    return redirect()
        ->route('admin.users.index')
        ->with('success', 'Usuário atualizado com sucesso.');
}

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Usuário removido com sucesso.');
    }
}
