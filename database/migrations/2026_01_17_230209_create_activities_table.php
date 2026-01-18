<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id(); // Use um ID incremental padrão
            $table->string('place_id'); // O ID do Google entra aqui
            $table->integer('day_index')->default(0);
            $table->string('name');
            $table->foreignId('city_id')->constrained()->onDelete('cascade');
            $table->float('rating')->nullable(); // O Google às vezes não retorna rating
            $table->integer('priceLevel')->nullable();
            $table->json('cost'); // Mude para JSON para aceitar o objeto {min, max}
            $table->string('address')->nullable();
            $table->string('lat')->default(0);
            $table->string('lng')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
