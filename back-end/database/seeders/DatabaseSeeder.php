<?php

namespace Database\Seeders;
use Carbon\Carbon;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /* User::factory()->create([
            'name' => 'Test User',
            'username' => 'admin',
            'email' => 'test@example.com',
            'birth_day' => Carbon::now()->subYears(rand(18, 60))->subMonths(rand(0, 11))->subDays(rand(0, 30))->format('Y-m-d'),
            'is_admin' => true,
            'profile_img'=>'https://source.unsplash.com/random/?person='.fake()->numberBetween(1,10),
            'created_at' => now()
        ]);
       
        User::factory(10)->create(); */

       $this->call([
            PostSeeder::class,
            FollowerSeeder::class
        ]);

    }
}
